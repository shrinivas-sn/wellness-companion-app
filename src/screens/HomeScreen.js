import Button from "../components/button";
import MotivationalQuote from "../components/MotivationalQuote";
import ScreenWrapper from "../components/ScreenWrapper";
export default function HomeScreen() {
  return (
    <ScreenWrapper>
      <MotivationalQuote />
      <Button title="Home Screen" />
    </ScreenWrapper>
  );
}
