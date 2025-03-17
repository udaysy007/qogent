'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { GraduationCap, Globe2, Award, Users, Coffee, Heart, Brain } from 'lucide-react'

const stats = [
  {
    value: '88%',
    label: 'Success Rate',
    description: "Because we know the German uni system like the back of our hand (and all its quirks!)",
    gradient: 'from-violet-500 to-purple-500',
    icon: Award,
  },
  {
    value: '2000+',
    label: 'Students Placed',
    description: "That's a lot of visa applications we've survived together!",
    gradient: 'from-blue-500 to-cyan-500',
    icon: Users,
  },
  {
    value: '50+',
    label: 'University Partners',
    description: "We've got friends in high places (and by high, we mean really good universities)",
    gradient: 'from-emerald-500 to-green-500',
    icon: GraduationCap,
  },
  {
    value: '95%',
    label: 'Visa Success',
    description: "We're basically visa whisperers at this point",
    gradient: 'from-orange-500 to-amber-500',
    icon: Globe2,
  },
]

const values = [
  {
    icon: Coffee,
    title: 'Your Study Abroad Besties',
    description: "We're the friends who'll stay up late helping you with applications – supportive without being preachy. Think of us as your academic cheerleaders!",
    gradient: 'from-pink-500 via-red-500 to-yellow-500',
  },
  {
    icon: Brain,
    title: 'Been There, Done That',
    description: "We've made all the mistakes so you don't have to. Our team has survived the German bureaucracy maze and lived to tell the tale!",
    gradient: 'from-green-500 via-teal-500 to-blue-500',
  },
  {
    icon: Heart,
    title: 'Merit > Money',
    description: "We believe brilliant minds shouldn't be held back by bank balances. Simple as that.",
    gradient: 'from-purple-500 via-violet-500 to-indigo-500',
  },
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-background to-background/80">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Hey there! <span className="bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">Study Abroad Besties</span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-muted-foreground"
            >
              We're not your typical education consultants – we're your virtual study abroad besties who've been there, 
              done that, and made all the mistakes so you don't have to!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <stat.icon className="h-8 w-8 mb-4 text-primary" />
                    <div className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-4xl font-bold text-transparent mb-2`}>
                      {stat.value}
                    </div>
                    <h3 className="font-semibold mb-2">{stat.label}</h3>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="mx-auto max-w-3xl"
          >
            <motion.div variants={fadeIn} className="text-center mb-8">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary mb-4">
                Our Not-So-Secret Mission
              </span>
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="prose prose-lg dark:prose-invert mx-auto text-center"
            >
              <p className="text-lg md:text-xl">
                Look, we'll be honest – navigating international education can feel like assembling 
                furniture with instructions that keep changing languages. But that's exactly why 
                we're here! We're making quality education accessible to everyone who deserves it, 
                regardless of their bank balance. Because let's face it – brilliant minds shouldn't 
                be held back by bureaucracy or finances.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="mx-auto max-w-2xl text-center mb-12"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl font-bold tracking-tight mb-4"
            >
              What Makes Us Different
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <value.icon className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl font-bold tracking-tight mb-6"
            >
              Meet Your Support Squad
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-lg text-muted-foreground"
            >
              Remember that friend who helped you prepare for your first job interview? 
              That's us, but for your entire international education journey! Our team has 
              survived countless visa applications, mastered the art of dealing with German 
              bureaucracy, and we're here to share all our hard-earned wisdom with you.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 