import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart, Award } from 'lucide-react';
import Button from '../components/Button';
import logo from '../assets/Galobalogo.jpeg'

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Quality First',
      description: 'We never compromise on the quality of our ingredients or meals.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'We build a community of fitness enthusiasts supporting each other.',
    },
    {
      icon: Target,
      title: 'Goal Oriented',
      description: 'Every meal is designed to help you achieve your fitness goals.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service.',
    },
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      bio: 'Former fitness coach with 10+ years of nutrition expertise.',
    },
    {
      name: 'Sarah Chen',
      role: 'Head Nutritionist',
      bio: 'Certified dietitian specializing in sports nutrition.',
    },
    {
      name: 'Mike Rodriguez',
      role: 'Operations Manager',
      bio: 'Expert in supply chain and quality management.',
    },
    {
      name: 'Emma Wilson',
      role: 'Customer Success Lead',
      bio: 'Dedicated to ensuring every customer achieves their goals.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-neutral-bg py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-poppins font-bold text-dark-text mb-4">
            About Galoba
          </h1>
          <p className="text-xl text-gray-600">
            Our story of fueling fitness dreams
          </p>
        </motion.div>

        {/* Brand Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-premium p-12 mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-poppins font-bold text-dark-text mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Galoba was founded in 2020 by a group of fitness enthusiasts who were tired of compromising on nutrition. We believed that healthy eating shouldn't be complicated or boring.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                What started as a small meal prep operation has grown into a trusted brand serving thousands of customers across the country. Today, we're committed to making premium nutrition accessible to everyone.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our mission is simple: to fuel your gains with the freshest, most nutritious meals possible.
              </p>
            </div>
            <div >
              <motion.img
                src={logo}
                alt="DBOX Logo"
                className="h-15 w-auto"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            </div>
          </div>
        </motion.section>

        {/* Mission & Vision */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-premium p-8"
          >
            <h3 className="text-2xl font-poppins font-bold text-primary mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To provide premium, nutritionally-balanced meals that empower individuals to achieve their fitness goals without compromising on taste or convenience.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-premium p-8"
          >
            <h3 className="text-2xl font-poppins font-bold text-primary mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become the leading diet food delivery brand globally, known for quality, innovation, and our commitment to customer success.
            </p>
          </motion.div>
        </motion.div>

        {/* Core Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-poppins font-bold text-dark-text mb-8 text-center">
            Our Core Values
          </h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 shadow-premium hover:shadow-hover transition-all duration-300 text-center"
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="inline-block p-4 bg-neutral-bg rounded-full mb-4"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <value.icon className="text-primary" size={32} />
                </motion.div>
                <h3 className="font-poppins font-bold text-lg text-dark-text mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

       

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-12 text-white mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50K+', label: 'Happy Customers' },
              { number: '1M+', label: 'Meals Delivered' },
              { number: '100%', label: 'Organic Ingredients' },
              { number: '24/7', label: 'Customer Support' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-4xl font-poppins font-bold mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-premium p-12 text-center"
        >
          <h2 className="text-3xl font-poppins font-bold text-dark-text mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of a movement that's changing how people think about fitness nutrition. Start your journey with Galoba today.
          </p>
          <Button variant="primary" size="lg">
            Get Started Now
          </Button>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
