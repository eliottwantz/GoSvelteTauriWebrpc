package api

import (
	"context"
	"math/rand"
	"time"
)

type ApiServiceRPC struct{}

func NewApiServiceRPC() *ApiServiceRPC {
	return &ApiServiceRPC{}
}

func (a *ApiServiceRPC) RandomNumber(ctx context.Context) (int, error) {
	// Create a new instance of the rand package
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	// Generate a random number between 1 and 100
	n := r.Intn(100) + 1
	// Print the generated random number
	return n, nil
}
