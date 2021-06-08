import './home.css';
import {useParams} from 'react-router-dom'

export default function Home() {
  const params = useParams();

  return (
    <div className="App">
      <p>name:{params.name}</p>
    </div>
  );
}
  