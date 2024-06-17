import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useBackgroundGeolocation } from "@/hooks/useBackgroundGeolocation";
import { useNotifications } from "@/hooks/useNotifications";
import {
  Button,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";

export default function App() {
  const { channels, expoPushToken, notification, schedulePushNotification } =
    useNotifications();

  const { location, enabled, setEnabled } = useBackgroundGeolocation();

  return (
    <SafeAreaView>
      <ScrollView>
        <ThemedView
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text>Your expo push token: {expoPushToken}</Text>
          <Text>{`Channels: ${JSON.stringify(
            channels.map((c) => c.id),
            null,
            2
          )}`}</Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>
              Title: {notification && notification.request.content.title}{" "}
            </Text>
            <Text>
              Body: {notification && notification.request.content.body}
            </Text>
            <Text>
              Data:{" "}
              {notification &&
                JSON.stringify(notification.request.content.data)}
            </Text>
          </View>
          <Button
            title="Press to schedule a notification"
            onPress={async () => {
              await schedulePushNotification();
            }}
          />
          <ThemedView style={{ alignItems: "center" }}>
            <ThemedText>Click to enable BackgroundGeolocation</ThemedText>
            <Switch value={enabled} onValueChange={setEnabled} />
            <ThemedText style={{ fontFamily: "monospace", fontSize: 12 }}>
              {location}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}
