const std = @import("std");
const content = @embedFile("./input.txt");

pub fn isSafe(row: []i32) bool {
    var parity: i32 = 0;
    for (0..row.len - 1) |i| {
        const diff = row[i] - row[i + 1];
        const newParity: i32 = if (diff > 0) 1 else -1;
        if (i > 0 and parity != newParity) {
            return false;
        }
        parity = newParity;

        if (@abs(diff) < 1 or @abs(diff) > 3) {
            return false;
        }
    }
    return true;
}

pub fn main() !void {
    var t = try std.time.Timer.start();

    // initial parsing stuff
    var splits = std.mem.split(u8, content, "\r\n");
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const allocator = gpa.allocator();

    var nums = std.ArrayList(std.ArrayList(i32)).init(allocator);

    while (splits.next()) |line| {
        var thisRow = std.ArrayList(i32).init(allocator);
        var it = std.mem.split(u8, line, " ");
        while (it.next()) |numStr| {
            const num = try std.fmt.parseInt(i32, numStr, 10);
            try thisRow.append(num);
        }
        try nums.append(thisRow);
    }

    // Part 1
    var safe: i32 = 0;
    for (nums.items) |row| {
        if (isSafe(row.items)) {
            safe += 1;
        }
    }
    std.log.debug("{d}\n", .{safe});

    // Part 2
    var safe2: i32 = 0;
    for (nums.items) |row| {
        for (0..row.items.len + 1) |i| {
            var thisRow = std.ArrayList(i32).init(allocator);
            for (0..row.items.len) |j| {
                if (i == 0 or j != i - 1) {
                    try thisRow.append(row.items[j]);
                }
            }
            if (isSafe(thisRow.items)) {
                safe2 += 1;
                break;
            }
        }
    }
    std.log.debug("{d}\n", .{safe2});

    std.debug.print("time:{s}\n", .{std.fmt.fmtDuration(t.read())});
}
