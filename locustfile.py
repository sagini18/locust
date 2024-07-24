from locust import HttpUser, task, between

class CRUDUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def create(self):
        payload = {
            "name": "John Doe",
            "email": "johndoe@example.com",
            "age": 30
        }
        response = self.client.post("/api/users", json=payload)
        if response.status_code == 201:
            print("User created successfully")

    @task
    def read(self):
        user_id = 1
        response = self.client.get(f"/api/users/{user_id}")
        if response.status_code == 200:
            print(f"User details: {response.json()}")

    @task
    def update(self):
        user_id = 2
        payload = {
            "name": "John Doe",
            "email": "johndoe@example.com",
            "age": 35
        }
        response = self.client.put(f"/api/users/{user_id}", json=payload)
        if response.status_code == 200:
            print("User updated successfully")

    @task
    def delete(self):
        user_id = 1
        response = self.client.delete(f"/api/users/{user_id}")
        if response.status_code == 204:
            print("User deleted successfully")