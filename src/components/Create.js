import { useState } from "react";
import { useHistory } from "react-router-dom"

const Create = () => {
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [author, setAuthor] = useState('Danko')
	const [isPending, setIsPending] = useState('false')
	const history = useHistory()

	const handleSubmit = (event) => {
		event.preventDefault();
		const blog = { title, body, author }
		setIsPending(true)

		fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            setIsPending(false);
            history.push('/');
        })
	}

	return (
		<div className="create">
			<h2>Add a New Blog</h2>
			<form onSubmit={handleSubmit}>
				<label>Blog Title</label>
				<input type="text" required value={body} onChange={(event) => setTitle(event.target.value)} />
				<label>Blog Body:</label>
				<textarea required value={body} onChange={(event) => setBody(event.target.value)} />
				<label>Blog author:</label>
        <select value={author} onChange={(event) => setAuthor(event.target.value)}>
					<option value="Danko">Danko</option>
					<option value="Dina">Dina</option>
					<option value="Maci">Maci</option>
        </select>
				{!isPending && <button>Add Blog</button>}
				{isPending && <button disabled>Adding Blog</button>}
			</form>
		</div>
	)
}

export default Create