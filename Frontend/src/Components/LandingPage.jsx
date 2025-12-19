import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="bg-base-100 text-base-content overflow-x-hidden">
      {/* Hero Section */}
      <div className="hero min-h-[90vh] bg-gradient-to-br from-rose-50 to-orange-50 dark:from-slate-900 dark:to-rose-950">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <div className="badge badge-secondary badge-outline mb-4 py-3 px-6 animate-bounce">
              ✨ Discover Your Next Great Story
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Where Every Wave <br /> Finds a Shore.
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-600 dark:text-gray-300 leading-relaxed px-4">
              Stop swiping and start connecting. **BondWave** is the premium social space 
              designed to help you find genuine chemistry, deep conversations, and 
              lasting relationships.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-6">
              <Link to="/signup" className="btn btn-primary btn-lg px-10 shadow-xl border-none bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:scale-105 transition-all">
                Create My Profile
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg px-10 hover:bg-rose-500 hover:border-rose-500 transition-all">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How BondWave Works</h2>
          <div className="h-1 w-20 bg-rose-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="card bg-base-200 border border-base-300 hover:shadow-2xl transition-all group">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:rotate-12 transition-transform">
                ❤️
              </div>
              <h3 className="card-title text-2xl mb-2">Heart-First Matching</h3>
              <p className="opacity-80">Our algorithm prioritizes shared values and personality traits over just surface-level photos.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card bg-base-200 border border-base-300 hover:shadow-2xl transition-all group">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:rotate-12 transition-transform">
                💬
              </div>
              <h3 className="card-title text-2xl mb-2">Meaningful Chats</h3>
              <p className="opacity-80">No more "Hey" or "WYD". We provide conversation starters to help the sparks fly instantly.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card bg-base-200 border border-base-300 hover:shadow-2xl transition-all group">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:rotate-12 transition-transform">
                🛡️
              </div>
              <h3 className="card-title text-2xl mb-2">Verified & Safe</h3>
              <p className="opacity-80">Your safety is our priority. Every profile is verified to ensure you’re meeting real people with real intent.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-neutral text-neutral-content py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
          <div>
            <div className="text-4xl font-black text-rose-500">5M+</div>
            <div className="text-xs uppercase tracking-widest mt-2 opacity-60">Daily Matches</div>
          </div>
          <div>
            <div className="text-4xl font-black text-rose-500">92%</div>
            <div className="text-xs uppercase tracking-widest mt-2 opacity-60">Success Rate</div>
          </div>
          <div>
            <div className="text-4xl font-black text-rose-500">120+</div>
            <div className="text-xs uppercase tracking-widest mt-2 opacity-60">Countries</div>
          </div>
          <div>
            <div className="text-4xl font-black text-rose-500">24/7</div>
            <div className="text-xs uppercase tracking-widest mt-2 opacity-60">Safety Support</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to find your match?</h2>
        <p className="mb-10 opacity-70">Join thousands of others riding the wave of new connections.</p>
        <Link to="/signup" className="btn btn-primary btn-wide btn-lg shadow-lg">
          Join BondWave Today
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;