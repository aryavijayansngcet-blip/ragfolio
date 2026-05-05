import { motion } from 'framer-motion';

export function About() {
  return (
    <section className="py-12 px-4 border-t border-zinc-800/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-4">About</h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-zinc-400 leading-relaxed"
        >
          I am a results-oriented Computer Science Engineering student with a proven track record of building end-to-end web applications using modern frameworks and cloud-integrated databases. Recognized for technical excellence at major hackathons, I am committed to writing clean, scalable code and optimizing user experiences. Seeking an internship or entry-level role to contribute to a forward-thinking development team while mastering emerging technologies.
        </motion.p>
      </div>
    </section>
  );
}
