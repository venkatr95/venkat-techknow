cmake_minimum_required(VERSION 3.10)
project(
  MqttExample
  VERSION 1.0
  LANGUAGES CXX)

find_package(PahoMqttCpp REQUIRED)

set(CMAKE_CXX_STANDARD 11)

add_executable(consumer SimpleConsumer.cpp)                           
target_link_libraries(consumer PahoMqttCpp::paho-mqttpp3)

add_executable(producer SimpleProducer.cpp)                           
target_link_libraries(producer PahoMqttCpp::paho-mqttpp3)