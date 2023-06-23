package main

import (
	"fmt"
	"log"
	"net/http"

	"testapp/api"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main() {
	err := startServer()
	if err != nil {
		log.Fatal(err)
	}
}

func startServer() error {
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(cors.AllowAll().Handler)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("."))
	})

	webrpcHandler := api.NewExampleServiceServer(api.NewExampleServiceRPC())
	r.Handle("/*", webrpcHandler)

	fmt.Println("Listening on 127.0.0.1:8080")
	return http.ListenAndServe("127.0.0.1:8080", r)
}
