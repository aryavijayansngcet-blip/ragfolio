import { motion } from 'framer-motion';

export function Skills() {
    const skills = [
        "Python", "C", "JavaScript", 
        "Prompt Engineering", "Claude AI", "LLM Optimization", 
        "Antigravity", "Cloud Databases", "IoT Sensor Integration",
        "Problem Solving", "Team Management"
    ];

    return (
        <section className="py-12 px-4 border-t border-zinc-800/50">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-white mb-6">Skills & Technologies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {skills.map((skill, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <span
                                className="inline-block w-full text-center px-3 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-300 text-sm hover:border-zinc-700 transition-colors"
                            >
                                {skill}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
