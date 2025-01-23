const workWithUsCards = [
  {
    title: "Shape the Future",
    description:
      "We work with business leaders and entrepreneurs to design and push their industries forward. From startup ideas to enterprise-level product & software development, we work together as a team to transform our clients' ideas into reality.",
  },
  {
    title: "Life-Long Learning",
    description:
      "We believe learning is a never-ending journey. With us, you'll continuously learn in an environment of highly skilled, top talent professionals with decades of combined experience. Not only do we work with industry leaders but our presence in the open-source space puts us among them.",
  },
  {
    title: "A Unique Culture",
    description:
      "Everyone talks about a work-life balance; we do it - for two reasons. Firstly, we believe in an environment of happy people. Secondly, even if you're highly productive, the only way to maintain productivity long-term is by taking time for the things that make you happy.",
  },
  {
    title: "Redesign The Impossible",
    description:
      "If your mindset is always focused on breaking through and surpassing your limits, tackling a brand new challenge every day in an environment where you constantly learn & grow, then this is the right place for you. We'd love to get to know you better.",
  },
] as const;

export default function WorkWithUs() {
  return (
    <section className="w-full bg-[#012241] py-16 px-4 md:px-8 mt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white text-4xl md:text-6xl font-bold text-left mb-12">
          What it Means to Work With Us
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {workWithUsCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6"
              role="article"
              tabIndex={0}
            >
              <h3 className="text-2xl font-semibold mb-3">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
