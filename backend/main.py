import uvicorn

# Main entry point for the backend; runs the API on a uvicorn server
if __name__ == "__main__":
    uvicorn.run("app.api:app", host="127.0.0.1", port=9000, reload=True)