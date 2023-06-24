package api

import (
	"context"
	"fmt"
	"math/rand"
	"time"
)

type ApiServiceRPC struct{}

func NewApiServiceRPC() *ApiServiceRPC {
	return &ApiServiceRPC{}
}

type WOW struct {
	msg string
}

func (a *ApiServiceRPC) RandomNumber(ctx context.Context) (int, error) {
	// Create a new instance of the rand package
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	// Generate a random number between 1 and 100
	n := r.Intn(100) + 1
	// Print the generated random number
	// var tt *WOW
	// fmt.Printf("msg: %v\n", tt.msg)
	return n, fmt.Errorf("THE ERORRRR")
}
