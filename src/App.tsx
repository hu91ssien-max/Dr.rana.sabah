/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Baby, 
  Calendar, 
  Heart, 
  Activity, 
  Bell, 
  User, 
  Info, 
  Stethoscope, 
  Clock,
  Menu,
  X,
  AlertTriangle,
  Instagram,
  Phone,
  MessageCircle,
  Edit,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Load data from localStorage or use defaults
  const [patientData, setPatientData] = useState(() => {
    const saved = localStorage.getItem('preg_patient_data');
    if (saved) return JSON.parse(saved);
    return {
      name: "عزيزتي الأم",
      currentWeek: 24,
      dueDate: "2024-08-15",
      lastCheckup: "2024-04-10",
      nextAppointment: "2024-05-12",
      weight: "68",
      bloodPressure: "110/70"
    };
  });

  const [editData, setEditData] = useState(patientData);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setPatientData(editData);
    localStorage.setItem('preg_patient_data', JSON.stringify(editData));
    setActiveTab('overview');
  };

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: Activity },
    { id: 'appointments', label: 'المواعيد', icon: Calendar },
    { id: 'tips', label: 'نصائح طبية', icon: Info },
    { id: 'tests', label: 'الفحوصات', icon: Stethoscope },
    { id: 'profile', label: 'الملف الشخصي', icon: User },
  ];

  const progressPercentage = Math.min(100, Math.round((patientData.currentWeek / 40) * 100));
  const daysRemaining = (40 - patientData.currentWeek) * 7;

  return (
    <div className="min-h-screen bg-bento-bg font-sans text-slate-900 flex flex-col md:flex-row" dir="rtl">
      {/* Sidebar for Desktop */}
      <aside className={`fixed inset-y-0 right-0 z-50 w-72 bg-white border-l border-rose-100 flex flex-col transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              🌸
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-slate-800 leading-none">د. رنا صباح</h1>
              <p className="text-[10px] text-rose-400 mt-1 uppercase tracking-widest font-black">عيادة النسائية والتوليد</p>
            </div>
          </div>

          <nav className="space-y-3 flex-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => { setActiveTab(tab.id); setIsMenuOpen(false); }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all cursor-pointer ${
                  activeTab === tab.id 
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 font-bold' 
                  : 'text-slate-400 hover:bg-rose-50 hover:text-rose-600 font-medium'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:mr-72 p-6 md:p-10">
        {/* Mobile Header */}
        <header className="flex items-center justify-between mb-8 md:hidden">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <span className="font-extrabold text-rose-600">لوحة المتابعة</span>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 bg-white rounded-lg shadow-bento" id="mobile-menu-btn">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Top Greeting */}
        <motion.section 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <p className="text-slate-400 font-bold text-sm mb-1 uppercase tracking-wide">صباح الخير، {patientData.name} ☀️</p>
            <h2 className="text-3xl font-black text-slate-800">أنتِ الآن في <span className="text-rose-500 underline underline-offset-8 decoration-rose-300">الأسبوع {patientData.currentWeek}</span></h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-full border border-rose-100 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-black text-slate-600">الموعد مؤكد</span>
            </div>
            <button className="w-12 h-12 bg-white rounded-full border border-rose-100 flex items-center justify-center text-xl shadow-sm hover:scale-110 transition-transform" id="notifications-btn">
              🔔
            </button>
          </div>
        </motion.section>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Pregnancy Progress Card - Main Bento Card */}
                <div className="bg-white p-8 rounded-[32px] shadow-bento border border-bento-border col-span-1 md:col-span-3 row-span-1 md:row-span-2 flex flex-col justify-between relative overflow-hidden" id="progress-card">
                  <div className="flex justify-between items-start z-10">
                    <div>
                      <h3 className="text-2xl font-black mb-2 text-slate-800">رحلة نمو جنينك</h3>
                      <p className="text-slate-500 text-sm max-w-sm font-medium leading-relaxed">حجم الجنين الآن يشبه حبة الشمام. الرئتان تبدآن بالتطور وبدأ الصغير يستجيب للأصوات.</p>
                    </div>
                    <span className="text-6xl font-black text-rose-50 absolute -left-4 -top-2 opacity-50">{progressPercentage}%</span>
                  </div>
                  
                  <div className="mt-12">
                    <div className="flex justify-between mb-4 items-end">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">المرحلة الثانية (الثلث الثاني)</span>
                      <span className="text-sm font-extrabold text-rose-500 italic">بقي {daysRemaining} يوم</span>
                    </div>
                    <div className="w-full h-8 bg-rose-50 rounded-full p-1 border border-rose-100 flex items-center">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-l from-rose-400 to-rose-600 rounded-full" 
                      ></motion.div>
                    </div>
                    <div className="flex justify-between mt-3 text-[10px] text-slate-400 font-extrabold px-2 uppercase tracking-wide">
                      <span>البداية</span>
                      <span>اليوم</span>
                      <span>الولادة</span>
                    </div>
                  </div>
                </div>

                {/* Next Appointment Bento Card */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-[32px] shadow-bento border border-rose-100 col-span-1 row-span-2 flex flex-col relative overflow-hidden group" 
                  id="next-appointment-card"
                >
                  {/* Decorative background element */}
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-50 rounded-full opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                  
                  <div className="flex justify-between items-start mb-6 z-10">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-rose-500" size={18} />
                      <h3 className="text-xs font-black text-rose-500 uppercase tracking-widest">الموعد القادم</h3>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <span className="text-[10px] bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-black flex items-center gap-1 border border-emerald-100">
                         <CheckCircle size={10} />
                         الموعد مؤكد
                       </span>
                       <span className="text-[10px] bg-rose-50 text-rose-500 px-3 py-1 rounded-full font-black border border-rose-100">
                         باقي 12 يوم
                       </span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center items-center text-center py-4 z-10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-7xl font-black text-slate-800 tracking-tighter">12</span>
                      <span className="text-2xl font-black text-rose-500">مايو</span>
                    </div>
                    
                    <div className="mt-4 flex flex-col items-center gap-2">
                       <div className="flex items-center gap-2 text-slate-600 font-extrabold bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                         <Clock size={16} className="text-rose-400" />
                         <span>10:30 صباحاً</span>
                       </div>
                       <p className="font-black text-slate-500 text-sm mt-1 flex items-center gap-2">
                         <Stethoscope size={14} />
                         سونار تفصيلي
                       </p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3 z-10">
                    <button className="w-full py-4 bg-rose-500 text-white rounded-2xl text-sm font-black shadow-lg shadow-rose-200 hover:bg-rose-600 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2">
                      <span>احجزي الآن</span>
                      <ExternalLink size={16} />
                    </button>
                    
                    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
                      <a 
                        href="https://wa.me/9647763333774" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="py-3 bg-[#25D366] text-white rounded-xl text-xs font-black shadow-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={14} fill="currentColor" />
                        <span>واتساب</span>
                      </a>
                      <button className="py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black shadow-sm hover:bg-slate-50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2" id="edit-appointment-btn">
                        <Edit size={14} />
                        <span>تعديل</span>
                      </button>
                    </div>
                    
                    <p className="text-[10px] text-slate-400 text-center font-bold">
                      يمكنك تأكيد أو تعديل موعدك بسهولة
                    </p>
                  </div>
                </motion.div>

                {/* Stat 1 */}
                <StatCard label="الوزن الحالي" value={patientData.weight} unit="كجم" trend="+1.2 كجم" id="stat-weight" />

                {/* Stat 2 */}
                <StatCard label="ضغط الدم" value={patientData.bloodPressure} trend="طبيعي ✓" id="stat-bp" />

                {/* Alert/Health Tip Bento Card */}
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="bg-amber-50 p-8 rounded-[32px] border border-amber-200 col-span-1 md:col-span-2 row-span-1 md:row-span-2 flex flex-col" 
                  id="alert-box"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">⚠️</span>
                    <h3 className="text-amber-900 font-extrabold text-lg">تنبيهات صحية هامة</h3>
                  </div>
                  <p className="text-amber-800 text-sm leading-relaxed font-bold">
                    لقد لاحظنا زيادة طفيفة في الوزن. يرجى تقليل استهلاك السكريات والالتزام برياضة المشي لمدة 20 دقيقة يومياً. لا تنسي موعد تحليل سكر الحمل الأسبوع المقبل.
                  </p>
                  <button onClick={() => setActiveTab('tips')} className="text-amber-600 font-black text-xs mt-auto pt-6 inline-flex items-center gap-2 hover:translate-x-[-4px] transition-transform cursor-pointer">
                    اقرئي المزيد من النصائح ←
                  </button>
                </motion.div>

                {/* Small Checklist Card */}
                <div className="bg-white p-6 rounded-[32px] shadow-bento border border-bento-border col-span-1 md:col-span-2 row-span-1 flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">مهام اليوم</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 opacity-50">
                        <div className="w-5 h-5 rounded-lg border border-rose-300 bg-rose-500"></div>
                        <span className="text-xs font-extrabold text-slate-700">الفيتامينات</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-lg border-2 border-rose-300"></div>
                        <span className="text-xs font-extrabold text-slate-700">شرب الماء</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-lg border-2 border-rose-300"></div>
                        <span className="text-xs font-extrabold text-slate-700">المشي</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-3xl bg-rose-100 flex items-center justify-center text-rose-500 font-black text-xl border border-rose-200">
                    2/3
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="bg-white p-8 rounded-[32px] shadow-bento border border-bento-border" id="appointments-list-card">
                 <h3 className="font-black text-xl mb-8 text-slate-800">سجل المواعيد</h3>
                 <div className="space-y-4">
                    <AppointmentRow title="مراجعة الثلث الثاني" date="10 نيسان 2024" status="مكتمل" id="appointment-1" />
                    <AppointmentRow title="سونار تفصيلي" date="12 أيار 2024" status="قادم" isNext id="appointment-2" />
                    <AppointmentRow title="فحص سكر الحمل" date="25 أيار 2024" status="مجدول" id="appointment-3" />
                 </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TipCard 
                  title="التغذية السليمة" 
                  content="ركزي على الأطعمة الغنية بالحديد وحمض الفوليك. الخضروات الورقية والبروتينات أساسية لنمو طفلك."
                  color="border-emerald-200 bg-emerald-50 text-emerald-800"
                  id="tip-1"
                />
                <TipCard 
                  title="الراحة والنوم" 
                  content="النوم على الجانب الأيسر يحسن تدفق الدم إلى الجنين والمشيمة."
                  color="border-blue-200 bg-blue-50 text-blue-800"
                  id="tip-2"
                />
                <TipCard 
                  title="متابعة الحركة" 
                  content="ابدئي بمراقبة عدد حركات الجنين يومياً من الأسبوع 28 وأخبرينا بأي تغير."
                  color="border-rose-200 bg-rose-50 text-rose-800"
                  id="tip-3"
                />
                <TipCard 
                  title="التحضير للولادة" 
                  content="نظمي حقيبة المستشفى مبكراً لتجنب التوتر في اللحظات الأخيرة."
                  color="border-amber-200 bg-amber-50 text-amber-800"
                  id="tip-4"
                />
              </div>
            )}
            
            {activeTab === 'tests' && (
              <div className="bg-white p-8 rounded-[32px] shadow-bento border border-bento-border" id="tests-card">
                <h3 className="font-black text-xl mb-6 text-slate-800">قائمة الفحوصات الضرورية</h3>
                <div className="space-y-4">
                   <TestItem label="تحليل هيموجلوبين الدم (Hb)" done={true} id="test-1" />
                   <TestItem label="فحص السكر التراكمي" done={true} id="test-2" />
                   <TestItem label="سونار رباعي الأبعاد" done={false} id="test-3" />
                   <TestItem label="فحص البروتين في البول" done={false} id="test-4" />
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="max-w-2xl mx-auto bg-white p-8 rounded-[32px] shadow-bento border border-bento-border">
                <h3 className="text-xl font-black mb-6 text-slate-800">تحديث بيانات الحمل</h3>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">الاسم الكامل</label>
                      <input 
                        type="text" 
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-rose-300 focus:ring-0 outline-none transition-all font-bold text-slate-700"
                        placeholder="أدخلي اسمك"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">الأسبوع الحالي</label>
                      <input 
                        type="number" 
                        min="1"
                        max="42"
                        value={editData.currentWeek}
                        onChange={(e) => setEditData({...editData, currentWeek: parseInt(e.target.value) || 0})}
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-rose-300 focus:ring-0 outline-none transition-all font-bold text-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">الوزن الحالي (كجم)</label>
                      <input 
                        type="text" 
                        value={editData.weight}
                        onChange={(e) => setEditData({...editData, weight: e.target.value})}
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-rose-300 focus:ring-0 outline-none transition-all font-bold text-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">ضغط الدم</label>
                      <input 
                        type="text" 
                        value={editData.bloodPressure}
                        onChange={(e) => setEditData({...editData, bloodPressure: e.target.value})}
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-rose-300 focus:ring-0 outline-none transition-all font-bold text-slate-700"
                        placeholder="مثال: 120/80"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-rose-500 text-white rounded-2xl font-black shadow-lg shadow-rose-200 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    حفظ البيانات
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Contact Section */}
        <section className="mt-12 bg-white p-8 rounded-[32px] shadow-bento border border-bento-border text-center" id="contact-section">
          <h3 className="text-2xl font-black mb-8 text-slate-800">تواصل معنا</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Clinic Phone */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">رقم العيادة</p>
                <a href="tel:07763333774" className="text-2xl font-black text-slate-800 hover:text-rose-500 transition-colors">
                  07763333774
                </a>
              </div>
            </div>

            {/* Instagram Button */}
            <a 
              href="https://www.instagram.com/dr.rana_sabah_neam" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-6 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-2xl flex flex-col items-center gap-4 hover:scale-[1.02] transition-transform shadow-md"
            >
              <Instagram size={32} />
              <span className="font-black text-lg">تابعنا على انستغرام</span>
            </a>

            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/9647763333774" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-6 bg-[#25D366] text-white rounded-2xl flex flex-col items-center gap-4 hover:scale-[1.02] transition-transform shadow-md"
            >
              <MessageCircle size={32} />
              <span className="font-black text-lg">احجز عبر واتساب</span>
            </a>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/9647763333774" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        aria-label="WhatsApp"
      >
        <MessageCircle size={32} fill="currentColor" />
      </a>
    </div>
  );
};

// Sub-components
const StatCard = ({ label, value, unit = null, trend = null, id }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-[32px] shadow-bento border border-bento-border flex flex-col justify-between" 
    id={id}
  >
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{label}</p>
    <div className="flex items-end gap-2">
      <span className="text-4xl font-black text-slate-800">{value}</span>
      {unit && <span className="text-sm text-slate-400 font-extrabold mb-1">{unit}</span>}
    </div>
    {trend && (
      <div className={`text-[10px] font-black mt-2 uppercase tracking-wide ${trend.includes('✓') ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trend}
      </div>
    )}
  </motion.div>
);

const AppointmentRow = ({ title, date, status, isNext = false, id }) => (
  <div 
    id={id}
    className={`flex items-center justify-between p-5 rounded-3xl border transition-all ${isNext ? 'border-rose-200 bg-rose-50 shadow-sm' : 'border-slate-100 hover:bg-slate-50'}`}
  >
    <div className="flex items-center gap-4">
      <div className={`w-3 h-3 rounded-full ${status === 'مكتمل' ? 'bg-emerald-500' : isNext ? 'bg-rose-500 animate-pulse' : 'bg-slate-300'}`}></div>
      <div>
        <p className="font-extrabold text-sm text-slate-800">{title}</p>
        <p className="text-xs text-slate-400 font-bold mt-0.5">{date}</p>
      </div>
    </div>
    <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider ${
      status === 'مكتمل' ? 'bg-emerald-100 text-emerald-600' : 
      status === 'قادم' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'
    }`}>
      {status}
    </span>
  </div>
);

const TipCard = ({ title, content, color, id }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className={`p-8 rounded-[32px] border-2 shadow-sm ${color}`} 
    id={id}
  >
    <h4 className="font-black text-lg mb-3 flex items-center gap-3">
      <div className="w-1.5 h-8 bg-current rounded-full opacity-30"></div>
      {title}
    </h4>
    <p className="text-sm leading-relaxed font-bold opacity-90">{content}</p>
  </motion.div>
);

const TestItem = ({ label, done, id }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100" id={id}>
    <span className="text-sm font-black text-slate-700">{label}</span>
    {done ? (
      <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
        <span>مكتمل</span>
        <Activity size={12} />
      </div>
    ) : (
      <button className="text-[10px] bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-600 hover:border-rose-500 hover:text-rose-500 transition-all font-black uppercase tracking-widest cursor-pointer shadow-sm" id={`${id}-action`}>
        تحديد موعد
      </button>
    )}
  </div>
);

export default App;
