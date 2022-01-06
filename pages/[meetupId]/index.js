import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      // image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
      // alt="This is a first meetup!"
      // title="First Meetup"
      // address="Some street 5"
      // description="The meetup description."
      image={props.meetupData.image}
      alt={props.meetupData.alt}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

// function needed for dynamic routes
// nextjs needs to know for which id pre-generates the page
// because in context -id is not pre-generated when user visits page
// but only during the build process
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mongo_test:mongodb@cluster0.cfxnj.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  // fetching only ids
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // allows to pre-generate some of the pages
    // for specific id,
    // and dynamically pre- generates missing when they received
    // false - all supported paths given
    // true - if new path was added before pre-rendering
    // 'blocking' - will pre-generate page on demand and then will cache it
    // true will immediately returns empty page
    // and then pull down dynamically generated content - handling page with no data
    // blocking - user will not see anything before data pre-generated
    // and finish served
    fallback: 'blocking',

    // will be generated automatically
    // from MongoDB
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),

    // previous version - manually setting
    //   [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
}

// code runs only on developer server side
export async function getStaticProps(context) {
  // context could be used to identify meetupId
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  // fetching data dynamically
  const client = await MongoClient.connect(
    "mongodb+srv://mongo_test:mongodb@cluster0.cfxnj.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
      // meetupData: {
      //   image:
      //   id: meetupId,
      //   alt: "This is a first meetup!",
      //   title: "First Meetup",
      //   address: "Some street 5",
      //   description: "The meetup description.",
      // },
    },
  };
}

export default MeetupDetails;
