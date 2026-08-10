#include <iostream>
#include <mqtt/async_client.h>
 
int main()
{
    std::string address = "localhost:1883";
    std::string clientId = "consumer";
 
    // Construct a client using the Ip and Id, specifying usage of MQTT V5.
    mqtt::async_client client(address, clientId);
    mqtt:connect_options options;

    options.set_keep_alive_interval(20);
 
    return 0;
}