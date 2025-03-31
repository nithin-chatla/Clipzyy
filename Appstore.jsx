import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const apps = [
  { name: "Weather App", description: "Get real-time weather updates.", file: "/downloads/weather-app.zip" },
  { name: "Task Manager", description: "Organize your tasks efficiently.", file: "/downloads/task-manager.zip" },
  { name: "Fitness Tracker", description: "Track your daily workouts.", file: "/downloads/fitness-tracker.zip" },
  { name: "Recipe Finder", description: "Discover new recipes every day.", file: "/downloads/recipe-finder.zip" },
  { name: "Adobe", description: "Download Adobe Software.", file: "https://en.softonic.com/download-launch?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
  { name: "Google Drive File", description: "Download from Google Drive.", file: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID" },
];

export default function AppStore() {
  const [search, setSearch] = useState("");

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-lg mx-auto bg-[#0d1b2a] text-[#e0e0e0] min-h-screen">
      <header className="w-full p-5 bg-gradient-to-r from-blue-900 to-blue-500 shadow-lg sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-white text-center">App Store</h1>
      </header>
      <main className="flex flex-col items-center p-6">
        <Input
          placeholder="Search for apps..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full max-w-md bg-[#1e293b] text-[#e0e0e0] border border-blue-500 p-2 rounded-md"
        />
        <div className="space-y-4 w-full max-w-md">
          {filteredApps.length > 0 ? (
            filteredApps.map((app, index) => {
              const isGoogleDrive = app.file.includes("drive.google.com");
              return (
                <Card key={index} className="p-4 bg-gradient-to-r from-[#1e293b] to-[#2d3b55] border border-transparent rounded-lg shadow-lg hover:scale-105 transition-transform">
                  <CardContent>
                    <a
                      href={app.file}
                      target={isGoogleDrive ? "_self" : "_blank"}
                      rel={isGoogleDrive ? "noopener" : "noopener noreferrer"}
                      download={!isGoogleDrive}
                      className="text-lg font-semibold text-white cursor-pointer hover:underline"
                    >
                      {app.name}
                    </a>
                    <p className="text-sm text-gray-400">{app.description}</p>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p className="text-gray-500">No apps found.</p>
          )}
        </div>
      </main>
      <footer className="mt-auto p-4 text-center text-sm text-gray-400 bg-[#1e293b] shadow-lg">
        &copy; 2025 App Store. All rights reserved.
      </footer>
    </div>
  );
}
