import ProfilePage from "./components/ProfilePage";
import getUser from '../action/getUser';

async function page() {
  const getuser = await getUser()
  // console.log('chof hna lfo9   :   ',getuser)
  return (
    <div>
      <ProfilePage user={getuser} />
    </div>
  );
}

export default page