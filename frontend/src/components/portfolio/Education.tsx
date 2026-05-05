import { motion } from 'framer-motion'

export function Education() {
    const educationList = [
        {
            degree: "Bachelor of Technology in Computer Science & Engineering",
            year: "2025–2029",
            institution: "Sree Narayana Guru College of Engineering and Technology, Payyanur",
            details: "Developing a strong foundation in data structures, algorithms, and system architecture."
        },
        {
            degree: "High School Diploma",
            year: "2019–2023",
            institution: "GGHSS Balussery",
            details: "Academic focus on Mathematics and Computer Science."
        }
    ];

    return (
        <section className="py-12 px-4 border-t border-zinc-800/50">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-white mb-6">Education</h2>
                <div className="space-y-6">
                    {educationList.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 hover:bg-zinc-900/50 transition-all"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                <h3 className="text-lg font-medium text-white">{edu.degree}</h3>
                                <span className="text-sm text-zinc-500 font-mono">{edu.year}</span>
                            </div>
                            <p className="text-zinc-400">{edu.institution}</p>
                            <p className="text-sm text-zinc-500 mt-4 leading-relaxed italic">
                                {edu.details}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
