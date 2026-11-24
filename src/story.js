// The life story. Each chapter is one page of the book.
// tone: page colour. lane: which side the cable runs on (laptop only).
export const cover = {
  title: 'Two strands, one story.',
  intro:
    "I'm Huzaifa Naseer. I build full-stack products and research AI for computer networks. This is how one plain wire became two.",
  facts: 'Lahore, 2020 to now. Eight chapters, about four minutes.',
}

export const chapters = [
  {
    id: 'one-plain-wire',
    title: 'One plain wire',
    when: '2020 to 2024',
    where: 'Lahore',
    tone: 'paper',
    lane: 'left',
    scene: 'school',
    text: [
      'Every cable starts as a single wire. Mine starts in Lahore.',
      'I finished matric at Unique High School with 1067 marks out of 1100, then took pre-engineering at Government College University. Four years in a straight line, one exam after another.',
      'Then came the choice at the end of it. I chose computers.',
    ],
  },
  {
    id: 'the-first-colour',
    title: 'The first colour',
    when: 'Aug to Dec 2024',
    where: 'FAST-NUCES, Lahore',
    tone: 'white',
    lane: 'right',
    scene: 'loop',
    text: [
      'In August 2024 I started computer science at FAST-NUCES, and the plain wire took on a colour.',
      'By December I had built a Tetris engine from scratch in C++. I wrote the game loop, the collision checks and every object by hand, and found out that a whole world can run on four steps, repeated.',
    ],
  },
  {
    id: 'other-peoples-screens',
    title: "Other people's screens",
    when: 'Summer 2025',
    where: 'BrainNet Telecommunications',
    tone: 'paper',
    lane: 'left',
    scene: 'sites',
    text: [
      'My first internship taught me that nobody else sees my screen. At BrainNet I built landing pages that had to hold together in every browser and at every width.',
      'That July I earned two certificates, JavaScript from Meta and Bootstrap from IBM. I kept making pages afterwards. Four of them are still live.',
    ],
  },
  {
    id: 'down-to-the-metal',
    title: 'Down to the metal',
    when: 'Nov 2025',
    where: '8088 assembly',
    tone: 'metal',
    lane: 'right',
    scene: 'crt',
    text: [
      'Then I went the other way. Down.',
      'Pop Till Drop is an arcade game in raw 8088 assembly. Interrupts drive the play, timer ticks keep the time, and everything you see is written straight into video memory.',
      'It left me with a question I still ask about every system. What is really happening underneath?',
    ],
    links: [{ label: 'Read the assembly', href: 'https://github.com/huzaifa596/assembly_game' }],
  },
  {
    id: 'the-whole-stack',
    title: 'The whole stack',
    when: 'Jan to Aug 2026',
    where: 'HireAtlas, then Tenbit Solutions',
    tone: 'orange',
    lane: 'left',
    scene: 'layers',
    text: [
      'With HireAtlas I followed one idea through every layer. A candidate applies with a CV in React, the request crosses a Node API, and a trigger inside PostgreSQL moves the application along.',
      'That summer I did it for a company. At Tenbit Solutions I worked on a billing platform, with role-based access, invoices and transaction logs on MongoDB, Express, React and Node.',
    ],
    links: [{ label: 'See HireAtlas', href: 'https://github.com/huzaifa596/HireAtlas' }],
  },
  {
    id: 'a-second-strand',
    title: 'A second strand',
    when: 'Mar 2026 to now',
    where: 'FAST-NUCES research',
    tone: 'mint',
    lane: 'right',
    scene: 'ensemble',
    text: [
      'While I was learning to build, something else began. The Dengue Outbreak Predictor studies past weeks to forecast the next one for cities across Pakistan, and gives a reason with each forecast.',
      'In July I joined FAST-NUCES as a research intern. Three models look at the same question, XGBoost, LightGBM and LSTM, and SHAP shows why they answered the way they did.',
      'One strand sends. This one listens.',
    ],
    links: [{ label: 'See the predictor', href: 'https://github.com/MuhammadAhmed1089/Dengue-Outbreak-Predictor' }],
  },
  {
    id: 'twisted-together',
    title: 'Twisted together',
    when: 'Aug to Oct 2026',
    where: 'Sanjhi AI',
    tone: 'spruce',
    lane: 'left',
    scene: 'sanjhi',
    text: [
      'Twist two wires together and they cancel the noise around them. It is why network cable is made that way, and it is the best description I have of Sanjhi.',
      'Sanjhi is a home for the kameti, the savings circle many families in Pakistan already run on trust and WhatsApp. I built it with one teammate, for web and Android. The full-stack half keeps the ledger. The AI half sets up committees from plain words, hears Urdu voice notes and rules on disputes.',
    ],
    links: [
      { label: 'Open Sanjhi', href: 'https://sanjhiai.netlify.app' },
      { label: 'View code', href: 'https://github.com/huzaifa596/SanjhiAI' },
    ],
  },
  {
    id: 'the-network-underneath',
    title: 'The network underneath',
    when: 'Now',
    where: 'AI networking',
    tone: 'deep',
    lane: 'right',
    scene: 'network',
    text: [
      'So I am back at the question from chapter four, on a larger machine. What is really happening underneath?',
      'A network sees a problem after users feel it. I study models that read traffic as it moves, flag the link that is about to fail and say why, so the route can change first.',
    ],
  },
]

export const ending = {
  title: 'The next page is blank',
  text: 'Have something to build, or something to study? Write the first line and I will write back.',
}
