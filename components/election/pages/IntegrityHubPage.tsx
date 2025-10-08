
import React, { useState } from 'react';
import Card from '../components/ui/Card.tsx';
import Input from '../components/ui/Input.tsx';
import Select from '../components/ui/Select.tsx';
import Textarea from '../components/ui/Textarea.tsx';
import Button from '../components/ui/Button.tsx';
import { IRAQ_GOVERNORATES } from '../constants.ts';
import { submitIntegrityReport } from '../services/api.ts';
import CheckCircleIcon from '../icons/CheckCircleIcon.tsx';

const IntegrityHubPage: React.FC = () => {
    const [submissionState, setSubmissionState] = useState<{ status: 'idle' | 'submitting' | 'success' | 'error', message: string, trackingId?: string }>({ status: 'idle', message: '' });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmissionState({ status: 'submitting', message: '' });
        
        try {
            const formData = new FormData(e.currentTarget);
            const response = await submitIntegrityReport(formData);
            if (response.success) {
                setSubmissionState({ 
                    status: 'success', 
                    message: 'تم استلام بلاغك بنجاح!', 
                    trackingId: response.trackingId 
                });
            } else {
                setSubmissionState({ status: 'error', message: 'حدث خطأ أثناء إرسال البلاغ.' });
            }
        } catch (error) {
            setSubmissionState({ status: 'error', message: 'حدث خطأ في الشبكة. يرجى المحاولة مرة أخرى.' });
        }
    };

    return (
        <div className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-white">مركز نزاهة الانتخابات</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300">
                            الإبلاغ عن المخالفات الانتخابية بسرية وأمان. صوتك يساهم في ضمان انتخابات نزيهة.
                        </p>
                    </div>
                    
                    {submissionState.status === 'success' ? (
                        <Card className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-4 bg-green-500/10 rounded-full">
                                   <CheckCircleIcon className="w-12 h-12 text-brand-teal" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-3">{submissionState.message}</h2>
                            <p className="text-slate-300 mb-2">رقم تتبع البلاغ الخاص بك هو:</p>
                            <p className="font-mono bg-black/20 p-2 rounded text-lg">{submissionState.trackingId}</p>
                            <p className="text-slate-300 mt-4">شكرًا لمساهمتك في الحفاظ على نزاهة العملية الانتخابية. سيقوم فريقنا بمراجعة البلاغ.</p>
                            <Button onClick={() => setSubmissionState({ status: 'idle', message: '' })} className="mt-6">
                                تقديم بلاغ جديد
                            </Button>
                        </Card>
                    ) : (
                        <Card>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-4">تفاصيل البلاغ</h2>
                                <Select id="reportType" name="reportType" label="نوع المخالفة" required>
                                    <option value="">اختر نوع المخالفة...</option>
                                    <option value="buying_votes">شراء أصوات</option>
                                    <option value="propaganda_violation">مخالفة دعاية انتخابية</option>
                                    <option value="voter_intimidation">ترهيب ناخبين</option>
                                    <option value="misinformation">نشر معلومات مضللة</option>
                                    <option value="other">أخرى</option>
                                </Select>

                                <Select id="governorate" name="governorate" label="المحافظة" required>
                                    <option value="">اختر المحافظة التي وقعت فيها المخالفة...</option>
                                    {IRAQ_GOVERNORATES.map(gov => (
                                        <option key={gov.id} value={gov.enName}>{gov.name}</option>
                                    ))}
                                </Select>

                                <Textarea
                                    id="description"
                                    name="description"
                                    label="وصف المخالفة"
                                    required
                                    placeholder="يرجى تقديم وصف تفصيلي للمخالفة، بما في ذلك الزمان والمكان والأشخاص المعنيين إن أمكن."
                                />

                                <Input
                                    id="evidence"
                                    name="evidence"
                                    label="إرفاق دليل (صورة، فيديو، مستند) - اختياري"
                                    type="file"
                                />

                                <div className="pt-4 text-center">
                                    <Button type="submit" className="w-full md:w-auto" disabled={submissionState.status === 'submitting'}>
                                        {submissionState.status === 'submitting' ? 'جاري الإرسال...' : 'إرسال البلاغ'}
                                    </Button>
                                </div>
                                <p className="text-center text-sm text-slate-400 pt-4">
                                    جميع البلاغات سرية. لن تتم مشاركة معلوماتك الشخصية.
                                </p>
                            </form>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IntegrityHubPage;
