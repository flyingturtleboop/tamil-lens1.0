'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: "📸",
      title: "Lens & Learn",
      description: "Freeze the frame and label objects in English + தமிழ் + transliteration",
      gradient: "from-cyan-400 to-teal-400"
    },
    {
      icon: "🔊",
      title: "Hear It",
      description: "Play natural audio in both languages (EN/Ta) with perfect pronunciation",
      gradient: "from-yellow-400 to-orange-400"
    },
    {
      icon: "📚",
      title: "Practice Quiz",
      description: "Multiple-choice and spelling with gentle spaced repetition",
      gradient: "from-green-400 to-emerald-400"
    }
  ];

  const steps = [
    { number: "1", icon: "🎯", title: "Point", description: "Aim at any object" },
    { number: "2", icon: "⚡", title: "Tap Scan", description: "Instant recognition" },
    { number: "3", icon: "🏆", title: "Learn", description: "Build vocabulary" }
  ];

  const testimonials = [
    {
      stars: 5,
      quote: "I learned 50 Tamil words in my first week! The audio helps so much with pronunciation.",
      author: "Priya, Age 9"
    },
    {
      stars: 5,
      quote: "This app makes Tamil accessible and fun. My students are engaged and actually excited to practice.",
      author: "Mr. Kumar, Teacher"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h1 className="text-6xl font-bold text-slate-900 leading-tight mb-6">
              See it. Say it.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">
                Learn Tamil.
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Tamil Lens turns your camera into a bilingual teacher—English, <span className="font-semibold">தமிழ்</span>, and clear audio.
            </p>
            <div className="flex gap-4">
              <button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all">
                Open App
              </button>
              <button className="bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-slate-200 hover:border-cyan-500 hover:shadow-lg transition-all">
                Try Practice Quiz
              </button>
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative bg-gradient-to-br from-cyan-100 via-teal-50 to-emerald-100 rounded-3xl p-12 shadow-2xl">
              <div className="border-4 border-dashed border-cyan-400 rounded-2xl p-16 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-5xl">📸</span>
                  </div>
                  <p className="text-slate-600 font-medium">Point & Learn</p>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-pink-400 rounded-full animate-pulse opacity-80"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="learn" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">
            How Tamil Lens Helps You Learn
          </h2>
          <p className="text-center text-slate-600 mb-16 text-lg">
            Three powerful ways to master Tamil vocabulary
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${feature.gradient} p-1 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${
                  activeFeature === index ? 'scale-105 shadow-2xl' : ''
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="bg-white rounded-xl p-8 h-full">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
            What Learners Say
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                  ))}
                </div>
                <p className="text-slate-700 text-lg mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <p className="text-slate-900 font-semibold">
                  — {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}