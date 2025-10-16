import React, { useEffect, useMemo, useState } from "react";

const parseCSV = (text) => {
  const rows = [];
  let current = "";
  let inQuotes = false;
  let row = [];

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (char === "\"") {
      if (inQuotes && text[i + 1] === "\"") {
        current += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && text[i + 1] === "\n") {
        i += 1;
      }
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  if (current.length || row.length) {
    row.push(current);
    rows.push(row);
  }

  if (!rows.length) {
    return [];
  }

  const [headers, ...dataRows] = rows;
  if (!headers || !headers.length) {
    return [];
  }

  return dataRows
    .filter((fields) => fields.some((value) => value && value.trim().length))
    .map((fields) =>
      headers.reduce((acc, header, index) => {
        const key = header.trim();
        acc[key] = fields[index] ? fields[index].trim() : "";
        return acc;
      }, {})
    );
};

const HamletCandidateBrowser = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [districtFilter, setDistrictFilter] = useState("All");

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const response = await fetch("/candidates.csv", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Failed to load candidates: ${response.status}`);
        }
        const text = await response.text();
        const parsed = parseCSV(text);
        setCandidates(parsed);
      } catch (err) {
        setError(err.message || "Unable to load candidate data.");
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const districtOptions = useMemo(() => {
    const unique = new Set();
    candidates
      .map((candidate) => candidate.ElectoralDistrict?.trim())
      .filter(Boolean)
      .forEach((district) => unique.add(district));
    return ["All", ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, [candidates]);

  const filteredCandidates = useMemo(() => {
    if (!normalizedSearch && (districtFilter === "All" || !districtFilter)) {
      return candidates;
    }

    return candidates.filter((candidate) => {
      const name = candidate.FullName?.toLowerCase() ?? "";
      const ballot = candidate.BallotName?.toLowerCase() ?? "";
      const district = candidate.ElectoralDistrict ?? "";

      const matchesSearch = normalizedSearch
        ? name.includes(normalizedSearch) || ballot.includes(normalizedSearch)
        : true;

      const matchesDistrict =
        districtFilter === "All" || !districtFilter
          ? true
          : district.toLowerCase().includes(districtFilter.toLowerCase());

      return matchesSearch && matchesDistrict;
    });
  }, [candidates, normalizedSearch, districtFilter]);

  const totalCandidates = candidates.length;
  const needsReview = useMemo(
    () =>
      candidates.filter((candidate) => candidate.DataQuality === "NEEDS_REVIEW")
        .length,
    [candidates]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-700 text-lg font-medium">Loading candidates...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="bg-white shadow rounded-lg p-6 max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Data Load Error</h2>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Ensure the latest cleaned dataset is available at
            <span className="font-semibold"> public/candidates.csv</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Hamlet Candidate Platform</h1>
          <p className="text-gray-600 mt-2">Tracking {totalCandidates.toLocaleString()} verified Iraqi election candidates.</p>
          <p className="text-sm text-orange-600 mt-1">{needsReview} candidates flagged for translation review.</p>
        </header>

        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="search"
              value={searchTerm}
              placeholder="Search by candidate or ballot name"
              onChange={(event) => setSearchTerm(event.target.value)}
              className="md:col-span-2 w-full rounded-md border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
            <select
              value={districtFilter}
              onChange={(event) => setDistrictFilter(event.target.value)}
              className="w-full rounded-md border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            >
              {districtOptions.map((districtOption) => (
                <option key={districtOption || "Unknown"} value={districtOption || "Unknown"}>
                  {districtOption}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Candidate Directory</h2>
            <span className="text-sm text-gray-500">{filteredCandidates.length.toLocaleString()} shown</span>
          </div>
          <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
            {filteredCandidates.map((candidate, index) => (
              <article key={`${candidate["CandidateID"]}-${index}`} className="px-6 py-4 hover:bg-gray-50 transition">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {candidate.FullName || candidate.BallotName || "Unnamed Candidate"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Ballot: <span className="font-medium text-gray-800">{candidate.BallotName || "N/A"}</span>
                    </p>
                  </div>
                  <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {candidate.CandidateID}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                    {candidate.ElectoralDistrict || "District unavailable"}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                    {candidate.Sex || "Sex unknown"}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      candidate.DataQuality === "NEEDS_REVIEW"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {candidate.DataQuality || "Quality: N/A"}
                  </span>
                </div>
                <p className="mt-3 text-xs text-gray-500">Last updated {candidate.LastUpdated || "Unknown"}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HamletCandidateBrowser;

