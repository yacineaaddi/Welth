import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

const useNativeTabs = Platform.OS === "ios";

export default function TabLayout() {
  if (useNativeTabs) {
    return (
      <NativeTabs
        backgroundColor="#0B0E14"
        tintColor="#4A9EFF"
        iconColor={{ default: "#5C5F68", selected: "#4A9EFF" }}
        labelStyle={{
          default: { color: "#5C5F68" },
          selected: { color: "#4A9EFF" },
        }}
      >
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="house.fill" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="transactions">
          <NativeTabs.Trigger.Icon sf="list.bullet" />
          <NativeTabs.Trigger.Label>Transactions</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="add-transaction">
          <NativeTabs.Trigger.Icon sf="plus.circle.fill" />
          <NativeTabs.Trigger.Label>Add</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="assistant">
          <NativeTabs.Trigger.Icon sf="brain.head.profile" />
          <NativeTabs.Trigger.Label>Assistant</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <NativeTabs.Trigger.Icon sf="person.fill" />
          <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4A9EFF",
        tabBarInactiveTintColor: "#5C5F68",
        tabBarShowLabel: true,

        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          height: 75,
          paddingTop: 10,
          paddingBottom: 10,
          paddingHorizontal: 10,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          borderRadius: 50,
          elevation: 8,
          shadowColor: "#000000",

          shadowOffset: {
            width: 0,
            height: 4,
          },

          shadowOpacity: 0.08,
          shadowRadius: 10,
        },

        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 4,
        },

        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-transaction"
        options={{
          title: "Add",
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-circle" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: "Assistant",
          tabBarIcon: ({ color, size }) => (
            <Feather name="cpu" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
}
