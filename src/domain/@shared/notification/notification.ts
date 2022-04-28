export type NotificationErrorProps = {
    message: string;
    context: string;
};
  
export default class Notification {
    private errors: NotificationErrorProps[] = [];
  
    addError(error: NotificationErrorProps) {
      this.errors.push(error);
    }
  
    hasErrors(): boolean {
      return this.errors.length > 0;
    }
  
    getErrors(): NotificationErrorProps[] {
      return this.errors;
    }

    messages(context?: string): string {

        let messages: NotificationErrorProps[] = this.errors;

        if (context !== undefined) {
            messages = messages.filter(error => error.context === context);
        }

        return messages
                .map(error => `${error.context}: ${error.message}`)
                .join(", ");

    }
  
    // messages(context?: string): string {
    //   let message = "";
    //   this.errors.forEach((error) => {
    //     if (context === undefined || error.context === context) {
    //       message += `${error.context}: ${error.message},`;
    //     }
    //   });
    //   return message;
    // }
  }