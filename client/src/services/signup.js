export const register = ({ name, username, password, email, avatar }) => {
  const mutation = `
	mutation($name: String!, $username: String!, $email: String!, $password: String!, $avatar: String) {
		register (input: {
			name: $name,
			username: $username,
			email: $email,
			password: $password,
			avatar: $avatar
		}){
			name
			email
		}
	}
`;
  return fetch("/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      mutation,
      variables: {
        name,
      },
    }),
  }).then((res) => res.json());
};
