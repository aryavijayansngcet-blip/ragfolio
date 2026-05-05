import { motion } from 'framer-motion';

export function Projects() {
  const projects = [
    {
      name: "DischargeIQ | Automated Healthcare Workflow",
      description: "Developed an automated patient discharge system designed to reduce hospital administrative bottlenecks. Integrated real-time data processing to streamline documentation and improve the patient handover experience. (First Prize Winner at Tink Her Hack 4.0)"
    },
    {
      name: "Haritha Thavam | AI-Driven Agritech Solution",
      description: "Architected an AI-enabled rooftop farming system that utilizes a network of IoT sensors to monitor soil health, moisture, and plant growth. Implemented predictive analytics to optimize water usage and nutrient delivery, promoting sustainable urban agriculture."
    }
  ];

  return (
    <section id="projects" className="py-12 px-4 border-t border-zinc-800/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-6">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-default"
            >
              <h3 className="font-medium text-white text-lg">{project.name}</h3>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
