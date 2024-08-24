'use server'

const SetUp = async () => {
  console.log("User setting up")
  return (
    <div className="border-gray-600 border-b-2">
      It looks like you haven&apos;t set your user display preferences yet! Before you can submit playlists, please select a display name and profile picture
    </div>
  );
};

export default SetUp;
