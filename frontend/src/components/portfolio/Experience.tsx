import { motion } from 'framer-motion';

export function Experience() {
    const experience = [
        {
            role: "Lead Developer",
            company: "DischargeIQ (Tink Her Hack 4.0)",
            duration: "Hackathon Project",
            description: "Led the development of an automated patient discharge system to reduce hospital administrative bottlenecks. Awarded First Prize."
        },
        {
            role: "Full Stack Developer & IoT Integrator",
            company: "Haritha Thavam",
            duration: "Project",
            description: "Architected an AI-enabled rooftop farming system utilizing IoT sensors for sustainable urban agriculture and predictive analytics."
        }
    ];

    return (
        <section id="experience" className="py-12 px-4 border-t border-zinc-800/50">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-white mb-6">Experience & Leadership</h2>
                <div className="space-y-12">
                    {experience.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            className="relative pl-8 border-l border-zinc-800"
                        >
                            <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1.5 ring-4 ring-zinc-950"></div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                <h3 className="text-lg font-medium text-white">{exp.role}</h3>
                                <span className="text-sm text-zinc-500">{exp.duration}</span>
                            </div>
                            <p className="text-blue-400 text-sm mb-3">{exp.company}</p>
                            <p className="text-zinc-400 text-sm">{exp.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
