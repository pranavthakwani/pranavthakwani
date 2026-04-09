'use client';

interface ProfileCardProps {
  className?: string;
}

export function ProfileCard({ className = "" }: ProfileCardProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="bg-[#f5f5f5] rounded-2xl p-8 w-[380px] relative shadow-xl overflow-hidden hover:-translate-y-2 transition duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)]">

        {/* Artistic Dotted Lines - Spiral Pattern */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 500">
          {/* Spiral dotted line */}
          <path
            d="M 50 50 Q 200 30, 350 50 T 350 250 Q 330 400, 200 450 T 50 250 Q 70 100, 200 50"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="8 12"
            strokeLinecap="round"
          />
          
          {/* Inner decorative spiral */}
          <path
            d="M 100 100 Q 200 80, 300 100 T 300 250 Q 280 350, 200 380 T 100 250 Q 120 150, 200 100"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="6 10"
            strokeLinecap="round"
          />
          
          {/* Corner accents */}
          <circle cx="40" cy="40" r="3" fill="rgba(59, 130, 246, 0.4)" />
          <circle cx="360" cy="40" r="3" fill="rgba(59, 130, 246, 0.4)" />
          <circle cx="40" cy="460" r="3" fill="rgba(59, 130, 246, 0.4)" />
          <circle cx="360" cy="460" r="3" fill="rgba(59, 130, 246, 0.4)" />
        </svg>

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden mb-6">
          <img
            src="/assets/portfolio-image.jpeg"
            alt="Pranav Thakwani"
            className="w-full h-[300px] object-cover"
          />
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-black text-center">
          Pranav Thakwani
        </h2>

        {/* Icon circle */}
        <div className="flex justify-center my-4">
          <div className="bg-blue-500 text-white p-3 rounded-full shadow-md">
            🔥
          </div>
        </div>

      </div>
    </div>
  );
}
