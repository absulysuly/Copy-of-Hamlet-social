export class ZodError extends Error {
  issues: string[];

  constructor(issues: string[] | string, message?: string) {
    const issueList = Array.isArray(issues) ? issues : [issues];
    super(message ?? issueList.join('; '));
    this.name = 'ZodError';
    this.issues = issueList;
  }
}

export type SafeParseSuccess<T> = { success: true; data: T };
export type SafeParseError = { success: false; error: ZodError };
export type SafeParseReturnType<T> = SafeParseSuccess<T> | SafeParseError;

abstract class BaseSchema<T> {
  abstract parse(value: unknown): T;

  safeParse(value: unknown): SafeParseReturnType<T> {
    try {
      const data = this.parse(value);
      return { success: true, data };
    } catch (error) {
      if (error instanceof ZodError) {
        return { success: false, error };
      }
      return {
        success: false,
        error: new ZodError('Unknown validation error', error instanceof Error ? error.message : undefined),
      };
    }
  }

  optional(): BaseSchema<T | undefined> {
    return new OptionalSchema(this);
  }
}

class OptionalSchema<T> extends BaseSchema<T | undefined> {
  constructor(private readonly inner: BaseSchema<T>) {
    super();
  }

  parse(value: unknown): T | undefined {
    if (value === undefined || value === null) {
      return undefined;
    }

    return this.inner.parse(value);
  }
}

class StringSchema extends BaseSchema<string> {
  parse(value: unknown): string {
    if (typeof value !== 'string') {
      throw new ZodError(`Expected string, received ${typeof value}`);
    }
    return value;
  }
}

class NumberSchema extends BaseSchema<number> {
  parse(value: unknown): number {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new ZodError(`Expected number, received ${typeof value}`);
    }
    return value;
  }
}

class BooleanSchema extends BaseSchema<boolean> {
  parse(value: unknown): boolean {
    if (typeof value !== 'boolean') {
      throw new ZodError(`Expected boolean, received ${typeof value}`);
    }
    return value;
  }
}

class AnySchema extends BaseSchema<any> {
  parse(value: unknown): any {
    return value;
  }
}

class ArraySchema<T> extends BaseSchema<T[]> {
  constructor(private readonly inner: BaseSchema<T>) {
    super();
  }

  parse(value: unknown): T[] {
    if (!Array.isArray(value)) {
      throw new ZodError(`Expected array, received ${typeof value}`);
    }

    return value.map((item, index) => {
      try {
        return this.inner.parse(item);
      } catch (error) {
        if (error instanceof ZodError) {
          throw new ZodError(error.issues, `Invalid array element at index ${index}`);
        }
        throw error;
      }
    });
  }
}

class ObjectSchema<T extends Record<string, any>> extends BaseSchema<T> {
  constructor(private readonly shape: { [K in keyof T]: BaseSchema<T[K]> }) {
    super();
  }

  parse(value: unknown): T {
    if (value === null || typeof value !== 'object' || Array.isArray(value)) {
      throw new ZodError('Expected object');
    }

    const result = value as Record<string, unknown>;

    for (const key of Object.keys(this.shape)) {
      const schema = this.shape[key as keyof T];
      try {
        schema.parse(result[key]);
      } catch (error) {
        if (error instanceof ZodError) {
          throw new ZodError(error.issues, `Invalid value for key "${key}"`);
        }
        throw error;
      }
    }

    return value as T;
  }
}

interface ZodStatic {
  string(): BaseSchema<string>;
  number(): BaseSchema<number>;
  boolean(): BaseSchema<boolean>;
  any(): BaseSchema<any>;
  array<T>(schema: BaseSchema<T>): BaseSchema<T[]>;
  object<T extends Record<string, any>>(shape: { [K in keyof T]: BaseSchema<T[K]> }): BaseSchema<T>;
}

export const z: ZodStatic = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  boolean: () => new BooleanSchema(),
  any: () => new AnySchema(),
  array: <T>(schema: BaseSchema<T>) => new ArraySchema(schema),
  object: <T extends Record<string, any>>(shape: { [K in keyof T]: BaseSchema<T[K]> }) => new ObjectSchema(shape),
};

export type infer<T> = T extends BaseSchema<infer R> ? R : never;
