import React from "react";
import { Form } from "react-bootstrap";

function UpdateUser({ handleSubmit, handleUpdate }) {
    const { username, password, email, birthday } = this.state;
    axios.put(`https://my-flixapp.herokuapp.com/users/${localStorage.getItem("username")}`,
        {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        },
        {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then(() => {
            const { reloadScreen } = this.props;
            localStorage.setItem("username", username);
            reloadScreen();
        }).catch((error) => {
            console.log(error);
        });
    return (
        <> <h2> Update Info </h2>
            <Form>
                <Form.Group>
                    <Form.Label> Username: </Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={user.Username}
                        onChange={e => handleUpdate(e)}
                        required
                        placeholder="Enter a username"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label> Password: </Form.Label>
                    <Form.Control
                        type="password"
                        defaultValue={user.Password}
                        onChange={e => handleUpdate(e)}
                        required
                        minLength="6"
                        placeholder="Your password must be 8 or more character"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label> Email: </Form.Label>
                    <Form.Control
                        type="email"
                        defaultValue={user.Email}
                        onChange={e => handleUpdate(e)}
                        required
                        placeholder="Enter your e-mail address"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label> Birthdate: </Form.Label>
                    <Form.Control
                        type="date"
                        defaultValue={user.Birthdate}
                        onChange={e => handleUpdate(e)}
                        required
                        placeholder="Enter your birthdate"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}> Update </Button>
            </Form>
        </>
    )
}

export default UpdateUser