export default function AudioRow(props) {
    const {audio_id, title, category, file_path, description } = props;

    return (
        <div key={audio_id} style={{ marginBottom: '1.5em' }}>
          <strong>Title: {title}</strong>
          <p>Category: {category}</p>
          <p>Description: {description}</p>
          <audio controls>
            <source src={`${process.env.REACT_APP_API_URL}/${file_path}`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>

    )
}