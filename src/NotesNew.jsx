import "./NotesNew.css";

export function NotesNew({ onCreate }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const params = new FormData(form);
    const successCallback = () => form.reset();
    onCreate(params, successCallback);
  };

  return (
    <div className="notes-new container py-4">
      <h1 className="mb-4">New Note</h1>

      <form onSubmit={handleSubmit} className="p-4 note-form">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input name="title" type="text" className="form-control" id="title" required />
        </div>

        <div className="mb-3">
          <label htmlFor="body" className="form-label">Body:</label>
          <input name="body" type="text" className="form-control" id="body" required />
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}
