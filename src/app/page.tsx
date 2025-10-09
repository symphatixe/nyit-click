import WelcomeHeader from "./components/homepageHeader";
import ProfilePic from "./components/profilePicture";
export default function Home() {
  return (
     <div className="flex gap-70">
      <WelcomeHeader/> <ProfilePic/>
    </div>
  );

}
