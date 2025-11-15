import WelcomeHeader from "./components/homepageHeader";
import ProfilePic from "./components/profilePicture";
export default function Home() {
  return (
    <div className="min-h-screen bg-[#002D72] flex flex-col px-6">
      <header className="flex justify-between items-center py-8">
        <h1 className="text-3xl text-white font-bold">NYIT CLICK</h1>
        <a
          href="/login"
          className="bg-[#F2A900] text-[#002D72] font-semibold px-6 py-2 rounded-full text-lg hover:bg-[#e29500] transition">
          Sign In
        </a>
      </header>

      <main className="flex flex-col items-center mt-20 mb-12">
        <h2 className="text-white text-4xl font-bold mb-4 text-center">
          Welcome to NYIT CLICK!
        </h2>
        <p className="text-[#F2A900] text-lg text-center max-w-xl mb-10">
          Organize your college journey at NYIT with our newly launched AI schedule planner, course matcher, shared resources, and ratings from your fellow peers!
        </p>
      </main>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-20">
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-[#002D72] text-xl font-bold mb-2">AI Planner</h3>
          <p className="text-gray-700">Get class reccomendations based on your course map. Avoid stress and let us do the work for you!</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-[#002D72] text-xl font-bold mb-2">Match Schedule</h3>
          <p className="text-gray-700">Find students with similar schedules for similar course interests and support.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-[#002D72] text-xl font-bold mb-2">Resource Central</h3>
          <p className="text-gray-700">Browse and share notes, materials, and useful links uploaded by your classmates to make your coursework easier!</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-[#002D72] text-xl font-bold mb-2">Ratings & Feedback</h3>
          <p className="text-gray-700">Read and submit anonymous feedback on courses and professors to better serve the interests of your peers.</p>
        </div>
      </section>
    </div>
  );
}
