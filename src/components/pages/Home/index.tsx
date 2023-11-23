import "./Home.css";

import MasonryGallery from "@/components/MasonryGallery/MasonryGallery";

const Home = () => {
  return (
    <div className="Home">
      <header className="App-header">
        <h1>AI Gallery</h1>
      </header>
      <MasonryGallery />
    </div>
  );
};

export default Home;
