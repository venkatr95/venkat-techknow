#include <iostream>
#include <numeric>
#include <thread>
#include <vector>

#include "utility.h"

// With plain g++: g++ -std=c++17 -lpthread src/main/main.cc  -I ./

int main() {
  const int number_of_threads = 2;
  const int number_of_elements = 1000 * 1000 * 1000;
  const int step = number_of_elements / number_of_threads;
  std::vector<uint64_t> partial_sums(number_of_threads);

  std::thread t1(AccumulateRange, std::ref(partial_sums[0]), 0, step);
  std::thread t2(AccumulateRange, std::ref(partial_sums[1]), step, number_of_threads * step);

  t1.join();
  t2.join();

  uint64_t total = std::accumulate(partial_sums.begin(), partial_sums.end(), uint64_t(0));
  PrintVector(partial_sums); // Prints partial_sums
  std::cout << "total: " << total << std::endl;
  return 0;
}
