import React from 'react';
import { AvatarCircles } from '../ui/avatar-circles';
import { Code2, GraduationCap, FileCheck, Clock, X, Check } from 'lucide-react';

const PieChart = () => {
  return (
    <div className="relative w-[400px] h-[400px] mx-auto">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="#F8FAFC"  // Very light blue-gray
          className="transition-all duration-1000"
        />
        
        {/* Active Segment - 20% = 72 degrees = 20% of circumference */}
        <path
          d="M50 5 A45 45 0 0 1 95 50"  // Arc from top to right
          fill="#4F46E5"  // Indigo color
          className="transition-all duration-1000"
        />
      </svg>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-base font-medium text-gray-900">Only 20% is</p>
          <p className="text-base font-medium text-gray-900">actually needed</p>
        </div>
      </div>
    </div>
  );
};

const SmartAdmission = () => {
  return (
    <section className="py-24">
      <div className="container max-w-[1000px] mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Main Title & Subtitle */}
          <div className="text-center max-w-[800px] mb-20">
            <h2 className="text-[2.75rem] leading-tight font-bold text-gray-900 dark:text-gray-50 mb-8">
              Study Abroad, Your Way
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Tired of consultants dragging your application out for 12-18 months? We've got platforms that let you apply to top public unis—fast, no fluff, just results.
            </p>
          </div>

          {/* Comparison Section */}
          <div className="w-full max-w-[800px] grid md:grid-cols-2 gap-12 mb-20">
            {/* Old Way */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">The Old Way Sucks</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <X className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" />
                  <span>Months picking unis (ugh)</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <X className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" />
                  <span>Endless doc fixes (why?)</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <X className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" />
                  <span>Calls that waste your time</span>
                </li>
              </ul>
            </div>

            {/* Qogent Way */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">Qogent Fixes That</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-600 dark:text-gray-400">
                  <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-1" />
                  <span>Merit-First: Your grades, not commissions, get you in. No hidden fees, just fair shots.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-600 dark:text-gray-400">
                  <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-1" />
                  <span>You Call the Shots: No agendas, just tools tailored to your goals.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-600 dark:text-gray-400">
                  <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-1" />
                  <span>Tech That Works: Pick unis, nail docs, submit—done. All online, all yours.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-600 dark:text-gray-400">
                  <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-1" />
                  <span>DIY or Pro Help: Use our tools solo or grab an admission package for extra support.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Platform Features */}
          <div className="w-full max-w-[1000px] mx-auto mb-32">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-50 mb-4">
              How We Simplify
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-20 max-w-[600px] mx-auto">
              Everything you need to handle your applications independently, all in one place.
            </p>
            
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
              {/* Feature 1 */}
              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/70">
                  <GraduationCap className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
                    Instant profile matching
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Picking the right uni shouldn't take months. We analyze your grades and goals to find your best options, fast.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/70">
                  <FileCheck className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
                    Doc templates that work
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    No more endless fixes. Our ready-to-go templates ensure your documents are perfect the first time.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/70">
                  <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15L8 11H16L12 15Z" fill="currentColor"/>
                    <path d="M4 21H20M12 3V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
                    SOP tools that work
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Writing a killer Statement of Purpose is tough. Our guides and tips turn it into a breeze.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/70">
                  <Code2 className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
                    One-click submissions
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Every uni's portal is a maze. We streamline it into a single, painless process.
                  </p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/70">
                  <Clock className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
                    24/7 Smart Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Got questions at midnight? Our AI assistant is always ready to help.
                  </p>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/70">
                  <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
                    Deadline Tracking
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Never miss an important date. We keep track of all your application deadlines.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="w-full max-w-[720px] mx-auto">
            <div className="text-center space-y-12">
              {/* Success Stats */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                  Join students who got admitted to their dream universities
                </h3>
                <div className="flex justify-center">
                  <AvatarCircles numPeople={2000} />
                </div>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Over <span className="font-semibold">2000+</span> students used our platform to get into public universities
                </p>
              </div>

              {/* Success Message */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-2xl p-8 space-y-4">
                <p className="text-xl text-gray-900 dark:text-gray-50">
                  Ready to start your journey?
                </p>
                <div className="flex justify-center">
                  <a
                    href="/get-started"
                    className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-full transition-colors"
                  >
                    Get Started Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartAdmission; 