import { ref, computed, watchEffect } from 'vue'

const saved = (() => { try { return localStorage.getItem('dptc-lang') } catch { return null } })()
export const lang = ref(saved === 'en' ? 'en' : 'ar')
watchEffect(() => {
  document.documentElement.lang = lang.value
  document.documentElement.dir = lang.value === 'ar' ? 'rtl' : 'ltr'
  try { localStorage.setItem('dptc-lang', lang.value) } catch {}
})
export const toggleLang = () => { lang.value = lang.value === 'ar' ? 'en' : 'ar' }

const dict = {
  ar: {
    ribbon: 'نسخة عرض تجريبية — مُعدّة لمركز الضباب للعلاج الطبيعي',
    brand: 'مركز الضباب', brandSub: 'للعلاج الطبيعي',
    nav: { areas: 'ماذا نعالج', journey: 'رحلة العلاج', center: 'المركز', visit: 'الموقع', book: 'احجز تقييم' },
    hero: {
      kicker: 'علاج طبيعي وتأهيل · السليمانية، الرياض',
      title1: 'استعد حركتك.',
      title2: 'عِش بلا ألم.',
      lead: 'تقييم دقيق، خطة علاج مصمّمة لحالتك، وجلسات علاج يدوي وتمارين تأهيلية في صالة مجهّزة — لتعود لحياتك ونشاطك بثقة.',
      cta1: 'احجز جلسة تقييم', cta2: 'حدّد مكان الألم',
      stats: [
        { n: '4.5', l: 'تقييم على Google' },
        { n: '121', l: 'مراجعة' },
        { n: '6', l: 'أيام في الأسبوع' },
      ],
    },
    areas: {
      kicker: 'ماذا نعالج',
      title: 'اضغط على مكان الألم',
      sub: 'اختر المنطقة التي تؤلمك لتعرف كيف نتعامل معها — وننقل اختيارك لنموذج الحجز مباشرة.',
      pick: 'اختر منطقة من الجسم',
      views: { front: 'من الأمام', back: 'من الخلف' },
      book: 'احجز تقييماً لهذه المنطقة',
      parts: {
        neck: { t: 'الرقبة والكتفين', d: 'آلام الرقبة، تيبّس الكتف، الانزلاق الغضروفي العنقي وآلام الجلوس الطويل أمام الشاشات.' },
        shoulder: { t: 'الكتف', d: 'الكتف المتجمد، إصابات الأوتار، وآلام رفع الذراع والتأهيل بعد خلع أو جراحة الكتف.' },
        back: { t: 'أسفل الظهر', d: 'آلام أسفل الظهر، الديسك، عرق النسا، وتصحيح وضعيات الجلوس والحمل.' },
        elbow: { t: 'المرفق واليد', d: 'مرفق التنس، التهاب الأوتار، وتأهيل اليد والرسغ بعد الكسور.' },
        hip: { t: 'الحوض والورك', d: 'آلام الورك والحوض، والتأهيل بعد عمليات تغيير المفصل.' },
        knee: { t: 'الركبة', d: 'خشونة الركبة، إصابات الأربطة والغضروف، والتأهيل بعد عمليات الرباط الصليبي.' },
        ankle: { t: 'الكاحل والقدم', d: 'التواء الكاحل، الشوكة العظمية، والتهاب اللفافة الأخمصية.' },
      },
      also: 'نتعامل أيضاً مع: إصابات الملاعب · التأهيل بعد العمليات · آلام ما بعد الحمل · كبار السن والتوازن',
    },
    journey: {
      kicker: 'رحلة العلاج',
      title: 'من أول جلسة… حتى تعود لنشاطك',
      steps: [
        { t: 'التقييم', d: 'فحص شامل للحركة والقوة ومصدر الألم، ومراجعة تقاريرك وصور الأشعة.' },
        { t: 'خطة مخصّصة', d: 'أهداف واضحة وعدد جلسات متوقّع، تُشرح لك قبل البدء.' },
        { t: 'جلسات العلاج', d: 'علاج يدوي، أجهزة علاج طبيعي، وتمارين تأهيلية في الصالة.' },
        { t: 'برنامج منزلي', d: 'تمارين تكمل بها في البيت حتى تحافظ على النتيجة.' },
      ],
    },
    center: {
      kicker: 'المركز',
      title: 'صالة تأهيل واسعة وغرف علاج خاصة',
      p: 'يقع المركز في الدور السادس بمبنى فندق الضباب ورويك على شارع الأمير عبدالعزيز بن مساعد بن جلوي — مع صالة تمارين مجهّزة وغرف علاج فردية للخصوصية.',
      labels: { 'rehab-hall': 'صالة التأهيل', gym: 'صالة التمارين', 'manual-therapy': 'العلاج اليدوي', 'treatment-room': 'غرفة علاج خاصة', reception: 'الاستقبال', building: 'المبنى' },
    },
    book: {
      kicker: 'احجز',
      title: 'احجز جلسة التقييم',
      sub: 'املأ البيانات وسيفتح واتساب برسالة جاهزة للمركز.',
      name: 'الاسم', phone: 'رقم الجوال', area: 'مكان الألم', areaAny: 'غير محدد / أكثر من منطقة', duration: 'منذ متى؟',
      durations: ['أقل من أسبوعين', 'أسابيع', 'أشهر', 'أكثر من سنة'],
      postop: 'بعد عملية جراحية', gender: 'أفضّل معالجاً من نفس الجنس',
      note: 'وصف مختصر للحالة',
      send: 'أرسل الطلب عبر واتساب',
      required: 'الرجاء كتابة الاسم ورقم الجوال.',
      msg: { hello: 'مرحباً مركز الضباب للعلاج الطبيعي، أرغب بحجز جلسة تقييم', name: 'الاسم', phone: 'الجوال', area: 'مكان الألم', duration: 'المدة', postop: 'بعد عملية جراحية', gender: 'يفضّل معالجاً من نفس الجنس', note: 'الحالة' },
    },
    visit: {
      kicker: 'الموقع والمواعيد',
      title: 'زورونا في السليمانية',
      addr: 'الدور السادس، مبنى فندق الضباب ورويك — شارع الأمير عبدالعزيز بن مساعد بن جلوي، السليمانية، الرياض 12211',
      hours: [{ d: 'السبت – الخميس', h: '١:٠٠ ظهراً – ١٠:٠٠ مساءً' }, { d: 'الجمعة', h: 'مغلق' }],
      dir: 'الاتجاهات', call: 'اتصال',
      rating: 'تقييم المركز على Google',
    },
    footer: { rights: 'جميع الحقوق محفوظة', demo: 'نسخة عرض تجريبية' },
    sticky: { call: 'اتصال', book: 'احجز عبر واتساب' },
    close: 'إغلاق',
  },
  en: {
    ribbon: 'Demo preview — prepared for Dabab Physical Therapy Center',
    brand: 'DPTC', brandSub: 'Dabab Physical Therapy',
    nav: { areas: 'What we treat', journey: 'Your journey', center: 'The center', visit: 'Location', book: 'Book assessment' },
    hero: {
      kicker: 'Physiotherapy & rehab · Al Sulimaniyah, Riyadh',
      title1: 'Move again.',
      title2: 'Live pain-free.',
      lead: 'A precise assessment, a plan built for your case, and hands-on therapy with rehab exercise in a fully equipped hall — so you get back to your life with confidence.',
      cta1: 'Book an assessment', cta2: 'Point to your pain',
      stats: [
        { n: '4.5', l: 'Google rating' },
        { n: '121', l: 'reviews' },
        { n: '6', l: 'days a week' },
      ],
    },
    areas: {
      kicker: 'What we treat',
      title: 'Tap where it hurts',
      sub: 'Pick the area that hurts to see how we treat it — your choice carries straight into the booking form.',
      pick: 'Pick an area of the body',
      views: { front: 'Front', back: 'Back' },
      book: 'Book an assessment for this area',
      parts: {
        neck: { t: 'Neck', d: 'Neck pain, stiffness, cervical disc problems and pain from long hours at a screen.' },
        shoulder: { t: 'Shoulder', d: 'Frozen shoulder, tendon injuries, painful overhead movement and rehab after dislocation or surgery.' },
        back: { t: 'Lower back', d: 'Low back pain, disc problems, sciatica and posture correction.' },
        elbow: { t: 'Elbow & hand', d: 'Tennis elbow, tendinitis and hand/wrist rehab after fractures.' },
        hip: { t: 'Hip & pelvis', d: 'Hip and pelvic pain, and rehab after joint replacement.' },
        knee: { t: 'Knee', d: 'Knee osteoarthritis, ligament and meniscus injuries, ACL post-op rehab.' },
        ankle: { t: 'Ankle & foot', d: 'Ankle sprains, heel spurs and plantar fasciitis.' },
      },
      also: 'We also treat: sports injuries · post-surgery rehab · postnatal pain · balance for older adults',
    },
    journey: {
      kicker: 'Your journey',
      title: 'From the first session to full activity',
      steps: [
        { t: 'Assessment', d: 'A full check of movement, strength and the source of pain, plus your reports and scans.' },
        { t: 'Tailored plan', d: 'Clear goals and an expected number of sessions, explained before we start.' },
        { t: 'Treatment sessions', d: 'Manual therapy, physio modalities and rehab exercise in the hall.' },
        { t: 'Home program', d: 'Exercises to keep the results going at home.' },
      ],
    },
    center: {
      kicker: 'The center',
      title: 'A spacious rehab hall and private treatment rooms',
      p: 'We are on the 6th floor of the Dabab Hotel by Warwick building on Prince Abdulaziz bin Musaed bin Jalawi St. — with an equipped exercise hall and private rooms for one-to-one treatment.',
      labels: { 'rehab-hall': 'Rehab hall', gym: 'Exercise hall', 'manual-therapy': 'Manual therapy', 'treatment-room': 'Private room', reception: 'Reception', building: 'The building' },
    },
    book: {
      kicker: 'Book',
      title: 'Book your assessment',
      sub: 'Fill in the details and WhatsApp opens with a ready message to the center.',
      name: 'Name', phone: 'Mobile', area: 'Where does it hurt?', areaAny: 'Not sure / more than one area', duration: 'How long?',
      durations: ['Under 2 weeks', 'Weeks', 'Months', 'Over a year'],
      postop: 'After surgery', gender: 'I prefer a same-gender therapist',
      note: 'Short description',
      send: 'Send request on WhatsApp',
      required: 'Please enter your name and mobile number.',
      msg: { hello: 'Hello DPTC, I would like to book an assessment', name: 'Name', phone: 'Mobile', area: 'Area', duration: 'Duration', postop: 'After surgery', gender: 'Prefers same-gender therapist', note: 'Case' },
    },
    visit: {
      kicker: 'Location & hours',
      title: 'Visit us in Al Sulimaniyah',
      addr: '6th floor, Dabab Hotel by Warwick building — Prince Abdulaziz bin Musaed bin Jalawi St., Al Sulimaniyah, Riyadh 12211',
      hours: [{ d: 'Saturday – Thursday', h: '1:00 PM – 10:00 PM' }, { d: 'Friday', h: 'Closed' }],
      dir: 'Directions', call: 'Call',
      rating: 'Google rating',
    },
    footer: { rights: 'All rights reserved', demo: 'Demo preview' },
    sticky: { call: 'Call', book: 'Book on WhatsApp' },
    close: 'Close',
  },
}
export const t = computed(() => dict[lang.value])
export const partIds = ['neck', 'shoulder', 'elbow', 'back', 'hip', 'knee', 'ankle']
export const chosen = ref('')
