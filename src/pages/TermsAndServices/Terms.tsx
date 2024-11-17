import React from 'react';

export default function Terms() {
  return (
    <div className="p-6 max-w-4xl    bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">გადაზიდვის წესები და პირობები</h2>

{/* სექცია 1 */}
<div className="mb-6">
  <h3 className="text-lg font-semibold">1. ზოგადი ინფორმაცია</h3>
  <p className="mt-2">
    <strong>კომპანია:</strong> NineSky, ფონიჭალა III მ/რ, კ13, ტელ: (+995) 510 10 10 85
  </p>
  <p className="mt-2">
    <strong>1.1 ვალდებულება:</strong> "ნაინსქი" ვალდებულია გადასცეს ამანათი საიმედოდ და უზრუნველყოს მისი მიწოდება 10-15 სამუშაო დღეში.
  </p>
  <p className="mt-2">
    <strong>1.2 კომპენსაცია:</strong> დაზიანებული ან გაუგზავნელი ამანათის კომპენსაცია ხდება 2 კვირის განმავლობაში.
  </p>
  <p className="mt-2">
    <strong>1.3 შენახვა:</strong> თუ ამანათი არ იქნება გატანილი 30 კალენდარული დღის განმავლობაში, იგი შეიძლება გადაეცეს განკარგვაზე.
  </p>
</div>

{/* სექცია 2 */}
<div className="mb-6">
  <h3 className="text-lg font-semibold">2. აკრძალული ნივთები გადაზიდვისთვის</h3>
  <ul className="list-disc ml-6 mt-2">
    <li>ალკოჰოლური სასმელები</li>
    <li>ცეცხლსასროლი იარაღი ან აქსესუარები</li>
    <li>ნარკოტიკული ნივთიერებები</li>
    <li>აფეთქებადი ან საშიში ნივთები</li>
    <li>ცოცხალი ცხოველები ან მცენარეები</li>
    <li>გაფუჭებადი ნივთები</li>
  </ul>
</div>

{/* სექცია 3 */}
<div className="mb-6">
  <h3 className="text-lg font-semibold">3. კლიენტის ვალდებულებები</h3>
  <p className="mt-2">
    <strong>3.1 დრო:</strong> ამანათი უნდა იქნას გატანილი 48 საათის განმავლობაში ჩამოსვლიდან.
  </p>
  <p className="mt-2">
    <strong>3.2 პასუხისმგებლობა:</strong> კლიენტები ვალდებულნი არიან განახორციელონ ამანათის გატანა 30 დღეში, წინააღმდეგ შემთხვევაში ამანათი გადაეცემა განკარგვაზე.
  </p>
</div>

{/* სექცია 4 */}
<div className="mb-6">
  <h3 className="text-lg font-semibold">4. დაზიანება, პასუხისმგებლობა და უსაფრთხოება</h3>
  <p className="mt-2">
    <strong>4.1 პასუხისმგებლობა:</strong> კომპანია არ არის პასუხისმგებელი ზიანზე, რომელიც გამოწვეულია ბუნებრივი კატასტროფებით ან მესამე მხარის შეცდომებით.
  </p>
  <p className="mt-2">
    <strong>4.2 უსაფრთხოება:</strong> საშიში ნივთები არ დაიშვება გადაზიდვაში.
  </p>
</div>

{/* სექცია 5 */}
<div className="mb-6">
  <h3 className="text-lg font-semibold">5. თვალთვალის პოლიტიკა</h3>
  <p className="mt-2">
    <strong>5.1 მონიტორინგი:</strong> კლიენტებს შეუძლიათ დაათვალიერონ ამანათი ტრეკინგის კოდის მეშვეობით.
  </p>
</div>

{/* სექცია 6 */}
<div className="mb-6">
  <h3 className="text-lg font-semibold">6. მომსახურების ინფორმაცია და გამოყენება</h3>
  <p className="mt-2">
    <strong>6.1 მომსახურების შეთანხმება:</strong> ჩვენი მომსახურების გამოყენებით, კლიენტები ეთანხმებიან ჩვენს წესებსა და პირობებს.
  </p>
</div>
    </div>
  );
}