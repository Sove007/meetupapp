import { useEffect, useState } from "react";
import Meetuplist from "../components/meetups/MeetupList";
import Loader from "./Loader"


const apiKey =process.env.REACT_APP_API_KEY;



export default function Allmeetups() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiKey}` )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key]
          };
          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <Loader />
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <Meetuplist meetups={loadedMeetups} />
    </section>
  );
}
