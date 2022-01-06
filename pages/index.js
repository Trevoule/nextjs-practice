import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react/cjs/react.production.min";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 5, 12345 Some City",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 10, 12345 Some City",
//     description: "This is a second meetup!",
//   },
// ];

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState=([])

  // instead we received props in getStaticProps <---
  // useEffect(() => {
  // send a http request and fetch data
  // setLoadedMeetups(DUMMY_MEETUPS)
  // }, [])

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.loadedMeetups} />
    </Fragment>
  );
}

// difference with getStaticProps that it will run not only during build process
// but always on the server after deployment
// use in case of changing data multiple times such as authentification
// if not use getStaticProps
// use only in case if we need req / res object data
// middleware

// export async function getServerSideProps(context) {
// request / response object data
// const req = context.req;
// const res = context.res;

// fetch data from an API

//   return {
//     props: {
//       loadedMeetups: DUMMY_MEETUPS,
//     },
//   };
// }

// data fetching pre-rendering - Static Pages
// first function to be called on server-side
// function executed during pre-rendering process, build process
// props preparation for page
// code will not be executed on the client-side

// pre-generate HTML file, can be stored and served by CDN
// faster than pre-generating and fetching data for every incoming request - getServerSideProps
// because it can be cached and reused instead of generating all the time

export async function getStaticProps() {
  // fetch data from an API
  // code will not be exposed on the client
  const client = await MongoClient.connect(
    "mongodb+srv://mongo_test:mongodb@cluster0.cfxnj.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  // close connection mongodb
  client.close();

  return {
    props: {
      loadedMeetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    // page update seconds
    revalidate: 10,
  };
}

export default HomePage;
