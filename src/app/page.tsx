import Features from "@/components/features";
import { GlobeDemo } from "@/components/globe_f";
import Testimonial from "@/components/testimonial";
import Marquee from "react-fast-marquee";
export default function Home() {
  const images = [
    {
      id: 1,
      src: "/images/newyork.jpg",
      name: "Trip To New York",
      description: "The city that never sleeps.",
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1543579596-2c11997c7706?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGR1YmFpfGVufDB8fDB8fHww",
      name: "Trip To Dubai",
      description: "A modern oasis in the desert.",
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9tZXxlbnwwfHwwfHx8MA%3D%3D",
      name: "Trip To Rome",
      description: "A historical treasure trove.",
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1554072675-66db59dba46f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdlcm1hbnl8ZW58MHx8MHx8fDA%3D",
      name: "Trip To Germany",
      description: "A blend of tradition and innovation.",
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1524473994769-c1bbbf30e944?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGxhY2VzfGVufDB8fDB8fHww",
      name: "Trip To Dubai",
      description: "A modern oasis in the desert.",
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1705346435684-a9de6cbb53dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGxhY2VzfGVufDB8fDB8fHww",
      name: "Trip To Rome",
      description: "A historical treasure trove.",
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1689784626180-3ae58cba794a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
      name: "Trip To Germany",
      description: "A blend of tradition and innovation.",
    },
    {
      id: 1,
      src: "https://plus.unsplash.com/premium_photo-1718285549990-74ef9fb74946?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
      name: "Trip To New York",
      description: "The city that never sleeps.",
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1516653980844-c68df1de5249?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
      name: "Trip To Dubai",
      description: "A modern oasis in the desert.",
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1719124724315-5cc04a47b072?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
      name: "Trip To Rome",
      description: "A historical treasure trove.",
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1666456157988-4a97b08e02d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
      name: "Trip To Germany",
      description: "A blend of tradition and innovation.",
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1705407197154-e06fd95e6589?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
      name: "Trip To Dubai",
      description: "A modern oasis in the desert.",
    },
    {
      id: 1,
      src: "https://plus.unsplash.com/premium_photo-1673698463059-c022fb3a32ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFwYW58ZW58MHx8MHx8fDA%3D",
      name: "Trip To Rome",
      description: "A historical treasure trove.",
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1508504509543-5ca56440e013?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8amFwYW58ZW58MHx8MHx8fDA%3D",
      name: "Trip To Germany",
      description: "A blend of tradition and innovation.",
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGphcGFufGVufDB8fDB8fHww",
      name: "Trip To New York",
      description: "The city that never sleeps.",
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1501560379-05951a742668?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGphcGFufGVufDB8fDB8fHww",
      name: "Trip To Dubai",
      description: "A modern oasis in the desert.",
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1494588024300-e9df7ff98d78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGphcGFufGVufDB8fDB8fHww",
      name: "Trip To Rome",
      description: "A historical treasure trove.",
    },
    {
      id: 1,
      src: "https://plus.unsplash.com/premium_photo-1680883415362-238794b19dde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWVzdGhldGljfGVufDB8fDB8fHww",
      name: "Trip To Dubai",
      description: "A modern oasis in the desert.",
    },
    {
      id: 1,
      src: "https://plus.unsplash.com/premium_photo-1661953630194-4bef71f0440d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwcGxhY2VzJTIwdG8lMjB2aXNpdHxlbnwwfHwwfHx8MA%3D%3D",
      name: "Trip To Rome",
      description: "A historical treasure trove.",
    },
    {
      id: 1,
      src: "https://media.istockphoto.com/id/1755591326/photo/charminar-the-iconing-building-is-listed-among-the-most-recognized-love-structures-in-india.webp?b=1&s=612x612&w=0&k=20&c=PlDkvAfx7_SHbs2xfw_SNCK9L2PXN6mqz_2f7GNL6qM=",
      name: "Trip To Germany",
      description: "A blend of tradition and innovation.",
    },
  ];

  const firstrow = images.slice(0, images.length / 2);
  const secondrow = images.slice(images.length / 2);
  return (
    <div>
      <GlobeDemo />
      <div className="mt-5 grid gap-4">
        <Marquee
          gradient
          gradientColor="hsl(222.2 84% 4.9%)"
          gradientWidth={400}
        >
          {firstrow.map((image) => (
            <div
              key={image.id}
              className="flex flex-col items-center justify-center p-4"
            >
              <img
                src={image.src}
                alt={image.name}
                className="w-64 h-64 rounded-lg object-cover"
              />
            </div>
          ))}
        </Marquee>
        <Marquee
          gradient
          gradientColor="hsl(222.2 84% 4.9%)"
          gradientWidth={400}
          direction="right"
        >
          {secondrow.map((image) => (
            <div
              key={image.id}
              className="flex flex-col items-center justify-center p-4"
            >
              <img
                src={image.src}
                alt={image.name}
                className="w-64 h-64 rounded-lg object-cover"
              />
            </div>
          ))}
        </Marquee>
      </div>
      <Features />
      <Testimonial />
    </div>
  );
}
