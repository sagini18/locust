from locust import HttpUser, task,TaskSet, between

class UserClass(TaskSet):
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

    @task(2)
    def read(self):
        user_id = 1
        response = self.client.get(f"/api/users/{user_id}")
        if response.status_code == 200:
            print(f"User details: {response.json()}")

class MainClass(HttpUser):
    tasks = [UserClass]
    wait_time = between(5, 10)