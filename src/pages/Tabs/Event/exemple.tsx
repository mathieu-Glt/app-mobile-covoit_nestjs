import React from 'react';
import { IonNav } from '@ionic/react';
import EventListPage from './EventListPage';

EventListPage

function Example() {
  return <IonNav root={() => <EventListPage />}></IonNav>;
}
export default Example;