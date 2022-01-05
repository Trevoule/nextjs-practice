import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import MeetupItem from "../../components/meetups/MeetupItem";

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
export function getStaticPaths() {
  return {
    // allows to pre-generate some of the pages
    // for specific id,
    // and dynamically pre- generates missing when they received
    // false - all supported paths given
    fallback: false,
    paths: [
      {
        params: {
          // will be generated automatically from data
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

// code runs only on developer server side 
export async function getStaticProps(context) {
  // context could be used to identify meetupId
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  return {
    props: {
      meetupData: {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
        id: meetupId,
        alt: "This is a first meetup!",
        title: "First Meetup",
        address: "Some street 5",
        description: "The meetup description.",
      },
    },
  };
}

export default MeetupDetails;
