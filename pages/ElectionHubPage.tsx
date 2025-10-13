// FIX: Replaced placeholder content with a functional ElectionHubPage component.
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ClipboardCheckIcon from '../components/icons/ClipboardCheckIcon';
import LocationMarkerIcon from '../components/icons/LocationMarkerIcon';
import VoteYeaIcon from '../components/icons/VoteYeaIcon';
import CalendarIcon from '../components/icons/CalendarIcon';
import ArrowDownIcon from '../components/icons/ArrowDownIcon';

const InfoStepCard: React.FC<{ icon: React.ReactNode; title: string; description: string; buttonText: string; link: string; }> = ({ icon, title, description, buttonText, link }) => (
    <Card className="text-center h-full flex flex-col items-center">
        <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-100 rounded-full">
                {icon}
            </div>
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 flex-grow mb-6">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">{buttonText}</Button>
        </a>
    </Card>
);

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-right flex justify-between items-center py-5 px-2 focus:outline-none"
            >
                <h4 className="text-lg font-semibold text-gray-800">{question}</h4>
                <ArrowDownIcon className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-5 px-2 text-gray-600">
                    {children}
                </div>
            )}
        </div>
    );
};

const ElectionHubPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">المركز الإرشادي للناخبين</h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
            كل ما تحتاجه لمعرفة حقوقك، والتحقق من تسجيلك، والمشاركة بفعالية في انتخابات العراق ٢٠٢٥.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">خطواتك ليوم الانتخاب</h2>
            <p className="mt-3 text-lg text-gray-500">مشاركة سهلة وواعية في 4 خطوات بسيطة.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <InfoStepCard
              icon={<ClipboardCheckIcon className="w-10 h-10 text-[#007a3d]" />}
              title="١. تحقق من تسجيلك"
              description="تأكد من أن اسمك مدرج في سجل الناخبين الرسمي لتتمكن من التصويت."
              buttonText="التحقق الآن"
              link="https://ihec.iq/"
            />
            <InfoStepCard
              icon={<LocationMarkerIcon className="w-10 h-10 text-[#007a3d]" />}
              title="٢. جد مركز اقتراعك"
              description="اعرف مكان مركز الاقتراع المخصص لك قبل يوم الانتخابات لتجنب أي تأخير."
              buttonText="ابحث عن مركزك"
              link="https://ihec.iq/"
            />
            <InfoStepCard
              icon={<VoteYeaIcon className="w-10 h-10 text-[#007a3d]" />}
              title="٣. تعرف على المرشحين"
              description="استكشف المرشحين في دائرتك الانتخابية وبرامجهم لاتخاذ قرار مستنير."
              buttonText="استكشف المرشحين"
              link="/governorate/baghdad" // Example link
            />
             <InfoStepCard
              icon={<CalendarIcon className="w-10 h-10 text-[#007a3d]" />}
              title="٤. خطط ليوم التصويت"
              description="تذكر أن يوم الانتخابات هو ١١ نوفمبر ٢٠٢٥. خطط لوقت ذهابك للإدلاء بصوتك."
              buttonText="عرض الجدول الزمني"
              link="#"
            />
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">الأسئلة الشائعة</h2>
            <p className="mt-3 text-lg text-gray-500">إجابات لأكثر الأسئلة تداولاً حول العملية الانتخابية.</p>
          </div>
          <Card>
            <FaqItem question="ما هي الوثائق المطلوبة للتصويت؟">
              <p>للإدلاء بصوتك، يجب عليك إبراز بطاقتك الوطنية الموحدة أو هوية الأحوال المدنية مع شهادة الجنسية العراقية، بالإضافة إلى بطاقة الناخب البيومترية.</p>
            </FaqItem>
            <FaqItem question="كيف يمكنني التأكد من أنني مسجل بشكل صحيح؟">
              <p>يمكنك التحقق من تسجيلك عبر الموقع الرسمي للمفوضية العليا المستقلة للانتخابات (IHEC) أو بزيارة أقرب مركز تسجيل تابع للمفوضية في منطقتك.</p>
            </FaqItem>
            <FaqItem question="هل يمكنني التصويت إذا كنت خارج العراق؟">
              <p>نعم، تنظم المفوضية عادةً عمليات تصويت للعراقيين في الخارج. تابع إعلانات المفوضية الرسمية لمعرفة الإجراءات والمواقع المخصصة للتصويت في بلد إقامتك.</p>
            </FaqItem>
             <FaqItem question="ماذا أفعل إذا واجهت مشكلة في مركز الاقتراع؟">
              <p>في حال واجهت أي مشكلة، يمكنك التحدث إلى مدير مركز الاقتراع. إذا لم يتم حل المشكلة، يمكنك تقديم شكوى رسمية عبر القنوات التي تحددها المفوضية أو الإبلاغ عن مخالفة عبر <a href="/integrity-hub" className="text-[#007a3d] font-semibold">مركز النزاهة</a>.</p>
            </FaqItem>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ElectionHubPage;