export function NotesNew({ onCreate }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const params = new FormData(form);
    const successCallback = () => form.reset();
    onCreate(params, successCallback);
  };

  return (
    <div>
      <h1>New Note</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input name="title" type="text" className="form-control" id="title" required />

        <label htmlFor="body">Body:</label>
        <input name="body" type="text" className="form-control" id="body" required />

        <button type="submit">Save</button>
      </form>
    </div>
  )
}