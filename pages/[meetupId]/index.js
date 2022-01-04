import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import MeetupItem from "../../components/meetups/MeetupItem";

function MeetupDetails() {
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
      alt="This is a first meetup!"
      title="First Meetup"
      address="Some street 5"
      description="The meetup description."
    />
  );
}

export default MeetupDetails;
