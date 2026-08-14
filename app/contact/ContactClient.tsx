'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Instagram, Send, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContactClient() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-500 mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Have a question, suggestion, or just want to say hi? We'd love to hear from you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-10 bg-[#0a0e1a]/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-8"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-300">Thank you for reaching out. We'll get back to you soon.</p>
              </motion.div>
            )}

            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">Your Name</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={cn(
                    "w-full bg-[#0a0e1a]/50 border rounded-xl py-3 px-4 text-white focus:outline-none transition-all",
                    errors.name ? "border-red-500/50 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:ring-2 focus:ring-blue-500"
                  )}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">Email Address</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(
                    "w-full bg-[#0a0e1a]/50 border rounded-xl py-3 px-4 text-white focus:outline-none transition-all",
                    errors.email ? "border-red-500/50 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:ring-2 focus:ring-blue-500"
                  )}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">Subject</label>
                <input 
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={cn(
                    "w-full bg-[#0a0e1a]/50 border rounded-xl py-3 px-4 text-white focus:outline-none transition-all",
                    errors.subject ? "border-red-500/50 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:ring-2 focus:ring-blue-500"
                  )}
                  placeholder="How can we help?"
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={cn(
                    "w-full bg-[#0a0e1a]/50 border rounded-xl py-3 px-4 text-white focus:outline-none transition-all resize-none",
                    errors.message ? "border-red-500/50 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:ring-2 focus:ring-blue-500"
                  )}
                  placeholder="Your message here..."
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                {status === 'loading' ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:border-blue-500/50 transition-colors group">
              <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Visit Us</h3>
                <p className="text-slate-400 leading-relaxed">
                  Department of Computer Science,<br />
                  Innovation Hall, Tech University<br />
                  Campus Road, City - 123456
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:border-violet-500/50 transition-colors group">
              <div className="p-3 bg-violet-500/10 rounded-xl group-hover:bg-violet-500/20 transition-colors">
                <Mail className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Email Us</h3>
                <p className="text-slate-400">c3community@techuniversity.edu</p>
                <p className="text-slate-500 text-sm mt-1">We aim to reply within 24 hours.</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:border-cyan-500/50 transition-colors group">
              <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                <Phone className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Call Us</h3>
                <p className="text-slate-400">+91 98765 43210</p>
                <p className="text-slate-500 text-sm mt-1">Mon-Fri, 9:00 AM - 5:00 PM</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-blue-400 text-slate-400 transition-all">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-blue-400 text-slate-400 transition-all">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-cyan-400 text-slate-400 transition-all">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-pink-400 text-slate-400 transition-all">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
